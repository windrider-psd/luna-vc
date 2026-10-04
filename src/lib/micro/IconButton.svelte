<script lang="ts" module>
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
    import LoadingCircle from "./LoadingCircle.svelte";

  export type ButtonColor =
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "dark"
    | "gray";

  export type IconButtonProps = {
    text: string;
    icon: IconDefinition;
    color?: ButtonColor;
    handle?: (data?: any) => any;
    data?: any;
    fullWidth?: boolean;
    disabledState?: boolean;
  };
  
</script>

<script lang="ts">
  let { data = $bindable(), ...props }: IconButtonProps = $props();
  let disabled = $state(false);
  async function onclick() {
    const result = props.handle?.(data);

    if (result instanceof Promise) {
      disabled = true;

      try {
        await result;
      } finally {
        disabled = false;
      }
    }
  }
</script>

<button
  class="btn btn-{props.color} icon-btn"
  class:w-full={props.fullWidth}
  {onclick}
  type="button"
  disabled={disabled || props.disabledState}
>
  {#if disabled}
    <LoadingCircle></LoadingCircle>
  {/if}
  <Fa icon={props.icon} />
  {props.text}
</button>
