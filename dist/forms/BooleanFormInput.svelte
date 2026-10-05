<script lang="ts">
  import Switch from "./Switch.svelte";

    type Props = {
        value:boolean,
        id:string,
        label:string
        onchange?: (value: boolean) => any;
    }
    
    let {value = $bindable(), id, label, onchange}: Props = $props()
</script>
<div>
<Switch
  design="slider"
  bind:value={value}
  id={id}
  label={label}
  {onchange}
/>

</div>