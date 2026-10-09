<script lang="ts">
  import type { FullAutoFill, HTMLInputTypeAttribute } from "svelte/elements";

  type Props = {
    value: any;
    id: string;
    type: HTMLInputTypeAttribute;
    label: string;
    required: boolean;
    autocomplete?: FullAutoFill;
    disabled?:boolean
    inputProps?:Record<string, any>
    onchange?: (value: any) => any;
  };

  let {
    value = $bindable(),
    disabled = $bindable(false),
    id,
    label = $bindable(""),
    required,
    onchange,
    type,
    autocomplete,
    inputProps = {}
  }: Props = $props();
</script>
<div>
<label for={id}>{label} {required ? "*" : ""}:</label>
<input
  {type}
  {id}
  {autocomplete}
  bind:value
  {required}
  {disabled}
  data-range="{type=="range" ? 1 : 0}"
  class="standard-input-box"
  onchange={(e) => {
    //@ts-ignore
    onchange?.(e.target.value!)
  }}
  {...inputProps}
/>
</div>