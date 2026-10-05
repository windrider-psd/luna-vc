<script lang="ts">
  type Props = {
    value: any;
    id: string;
    label: string;
    required: boolean;
    data: { value: string; label: string }[];
    onchange?: (value: any) => any;
    disabled?:boolean
  };

  let {
    value = $bindable(),
    disabled = $bindable(false),
    id,
    label,
    required,
    data,
    onchange,
  }: Props = $props();
</script>

<div>
  <label for={id}>{label}{required ? "*" : ""}:</label>
  <select
    {id}
    bind:value
    class="standard-input-box shadow"
    {required}
    onchange={(e) => {
      //@ts-ignore
      onchange?.(e.target.value!);
    }}
    {disabled}
  >
    {#each data as d}
      <option value={d.value}>{d.label}</option>
    {/each}
  </select>
</div>
