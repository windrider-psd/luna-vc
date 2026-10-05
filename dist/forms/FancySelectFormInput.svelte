<script lang="ts">
  import Select from "svelte-select";

  type Props = {
    value: any;
    id: string;
    justValue?: any;
    label: string;
    required: boolean;
    data: { value: string; label: string }[];
    placeholder?: string;
    onchange?: (value: any) => any;
  };

  let {
    value = $bindable(),
    id,
    label,
    required,
    data,
    onchange,
    placeholder,
    justValue = $bindable(),
  }: Props = $props();
</script>

<div>
  <label for={id}>{label}{required ? "*" : ""}:</label>
  <Select
    {id}
    bind:justValue
    bind:value
    items={data}
    {placeholder}
    {required}
    on:change={(e) => onchange?.(e.detail.value!)}
  ></Select>
</div>
