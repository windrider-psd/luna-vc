<script lang="ts">
  import type { FullAutoFill } from "svelte/elements";
  import LoadingCircle from "./../micro/LoadingCircle.svelte";
  import Switch from "./Switch.svelte";
  import Select from "svelte-select";
  import BooleanFormInput from "./BooleanFormInput.svelte";
  import SimpleSelectFormInput from "./SimpleSelectFormInput.svelte";
  import FancySelectFormInput from "./FancySelectFormInput.svelte";
  import SimpleTextFormInput from "./SimpleTextFormInput.svelte";
  import type { IconButtonProps } from "../micro/IconButton.svelte";
  import IconButton from "../micro/IconButton.svelte";
  import { OpenLoading } from "../loading/LoadingManager.svelte";
  type InputType =
    | "text"
    | "password"
    | "boolean"
    | "select"
    | "number"
    | "select-simple"
  export type GenericInputType = {
    label: string;
    id: string;
    type: InputType;
    autocomplete?: FullAutoFill;
    defaultValue?: any;
    required?: boolean;
    disabled?: boolean;
    data?: any;
    secondaryLabel?: string;
    onChange?: (value: any) => any;
    nullify?: boolean;
    key?: any;
    buttons?: IconButtonProps[];
    validate?: GenericFormValidator;
  };
  export type GenericFormValidator = (
    value: any
  ) => GenericFormValidationResult | Promise<GenericFormValidationResult>;
  export type GenericFormValidationResult = { valid: boolean; error: string };
  export type GenericFormInputGroup = {
    label: string;
    inputs: GenericInputType[];
  };

  type SubmitButton = {
    text: string;
  };

  type Props = {
    inputs: GenericInputType[];
    inputGroups?: GenericFormInputGroup[];
    submitButton?: SubmitButton;
    onSubmit: (data: any) => any;
  };

  let { inputGroups = [], ...props }: Props = $props();

  function ReduceInputs(inp: GenericInputType[]) {
    return inp.reduce(
      (p, c) => {
        return {
          ...p,
          [c.id]: c.defaultValue ?? (c.type == "boolean" ? false : c.defaultValue),
        };
      },
      {} as Record<string, string>
    );
  }

  let valueMap = $state({
    ...ReduceInputs([...inputGroups.map((g) => g.inputs)].flat()),
    ...ReduceInputs(props.inputs),
  });

  let errorMap: Record<string, string> = $state(
    Object.fromEntries(
      Object.entries(valueMap).map((e) => {
        return [e[0], ""];
      })
    )
  );

  export function setValue(id: string, value: any) {
    valueMap[id] = value;
    if (inputMap[id].type == "select") {
      defaultValues[id] = value;
      onSelectChange(id, value);
    } else if (inputMap[id].type == "select-simple") {
      onSelectChange(id, value);
    }
  }
  export function getValue(id: string) {
    return valueMap[id];
  }
  let textOnlyTypes: InputType[] = ["password", "text"];
  let nullifiableTypes: InputType[] = ["text", "select", "select-simple"];

  function GetSubmitValueOfInput(id: string) {
    let obj = valueMap[id];
    let v;
    let input = inputMap[id];
    if (obj == "null") {
      return null;
    }

    if (input.type == "boolean") {
      return obj;
    }

    if (input.nullify === true) {
      if (
        (nullifiableTypes.includes(input.type) && obj == "") ||
        obj == null ||
        obj == "null"
      ) {
        return undefined;
      }
    }

    if (
      obj != "" &&
      obj != null &&
      !isNaN(obj) &&
      !textOnlyTypes.includes(input.type)
    ) {
      v = +obj;
    } else {
      v = obj;
    }
    if (typeof v === "string") {
      v = v.trim();
    }
    return v;
  }
  function GetSubmitValue(): Record<string, any> {
    let map: any = {};

    for (const key in valueMap) {
      map[key] = GetSubmitValueOfInput(key);
    }
    return map;
  }

  let disabled = $state(false);
  export async function submit() {
    try {
      disabled = true;

      const validResult = await OpenLoading({title:"Validando", "promise":ValidateForm()});
      if (validResult.valid) {
        await props.onSubmit(GetSubmitValue());
      } else {
        alert(validResult.errors[0].error);
      }
    } finally {
      disabled = false;
    }
  }

  function CreateDefaultValuesMap() {
    let map: any = {};

    for (const group of inputGroups) {
      for (const i of group.inputs) {
        if (i.type == "select") {
          map[i.id] = (i.data as any[]).find((v) => v.value == i.defaultValue);
        } else {
          map[i.id] = i.defaultValue;
        }
      }
    }
    for (const i of props.inputs) {
      if (i.type == "select") {
        map[i.id] = (i.data as any[]).find((v) => v.value == i.defaultValue);
      } else {
        map[i.id] = i.defaultValue;
      }
    }
    return map;
  }
  function CreateInputMap(): Record<string, GenericInputType> {
    let map: Record<string, GenericInputType> = {};

    for (const group of inputGroups) {
      for (const i of group.inputs) {
        map[i.id] = i;
      }
    }
    for (const i of props.inputs) {
      map[i.id] = i;
    }
    return map;
  }
  let defaultValues = $state(CreateDefaultValuesMap());
  let inputMap = $state(CreateInputMap());

  async function normalizeValidate(
    result: GenericFormValidationResult | Promise<GenericFormValidationResult>
  ) {
    return await Promise.resolve(result);
  }

  async function onSelectChange(id: string, e: any) {
    const i = inputMap[id];
    const value = GetSubmitValueOfInput(id);
    if (i.onChange != undefined) {
      i.onChange(value);
    }

    if (i.validate != undefined) {
      const result = await normalizeValidate(
        i.validate(GetSubmitValueOfInput(id))
      );

      errorMap[id] = result.error;
    } else {
      errorMap[id] = "";
    }
  }

  export async function ValidateForm() {
    let errors: GenericFormValidationResult[] = [];
    for (const id in inputMap) {
      const i = inputMap[id];
      if (i.validate != undefined) {
        const result = await normalizeValidate(
          i.validate(GetSubmitValueOfInput(id))
        );
        errorMap[id] = result.error;
        if (!result.valid) {
          errors.push(result);
        }
      } else {
        errorMap[id] = "";
      }
    }
    return {
      valid: errors.length == 0,
      errors,
    };
  }
</script>

{#snippet renderInputMacro(input: GenericInputType)}
  {#if input.key != undefined}
    {#key input.key}
      {@render renderInput(input)}
    {/key}
  {:else}
    {@render renderInput(input)}
  {/if}
{/snippet}

{#snippet renderInput(input: GenericInputType)}
  {#if input.type == "select"}
    <div>
      <FancySelectFormInput
        id={input.id}
        label={input.label}
        required={input.required ?? false}
        data={input.data}
        bind:justValue={valueMap[input.id]}
        bind:value={defaultValues[input.id]}
        onchange={(e) => onSelectChange(input.id, e)}
      />
    </div>
  {:else if input.type == "select-simple"}
    <div>
      <SimpleSelectFormInput
        id={input.id}
        disabled={input.disabled}
        label={input.label}
        required={input.required ?? false}
        data={input.data}
        bind:value={valueMap[input.id]}
        onchange={(e) => onSelectChange(input.id, e)}
      />
    </div>
  {:else if input.type != "boolean"}
    <div>
      <SimpleTextFormInput
        id={input.id}
        type={input.type}
        disabled={input.disabled}
        autocomplete={input.autocomplete}
        bind:value={valueMap[input.id]}
        required={input.required ?? false}
        label={input.label}
        onchange={(e) => onSelectChange(input.id, e)}
      />
    </div>
  {:else}
    <BooleanFormInput
      label={input.label}
      id={input.id}
      bind:value={valueMap[input.id]}
      onchange={(e) => onSelectChange(input.id, e)}
    />
  {/if}
  {#if input.buttons != undefined && input.buttons.length > 0}
    <div class="generic-form-buttons-container">
      {#each input.buttons as button}
        <IconButton {...button} bind:data={valueMap[input.id]} />
      {/each}
    </div>
  {/if}
  {#if errorMap[input.id] != undefined && errorMap[input.id] != ""}
    <span class="generic-form-error">{errorMap[input.id]}</span>
  {/if}
{/snippet}
<form
  class="generic-form"
  onsubmit={(e) => {
    e.preventDefault();
    submit();
  }}
>
  {#each inputGroups as group}
    <div class="input-group-container">
      <h2>{group.label}</h2>
      <div class="input-group">
        {#each group.inputs as input}
          {@render renderInputMacro(input)}
        {/each}
      </div>
    </div>
  {/each}
  <div class="input-group">
    {#each props.inputs as input}
      {@render renderInputMacro(input)}
    {/each}
  </div>
  {#if props.submitButton != undefined}
    <button
      type="submit"
      class="generic-form-submit-button"
      {disabled}
    >
      {#if disabled}
        <LoadingCircle />
      {/if}
      {props.submitButton.text}
    </button>
  {/if}
</form>
