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
  class="btn btn-{props.color} flex items-center gap-2 justify-center"
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

<style>
@reference "tailwindcss";
  .btn {
@apply px-4 py-2 rounded font-medium transition-colors disabled:cursor-not-allowed;
}

.btn-primary {
@apply bg-blue-600 text-white hover:bg-blue-700
        disabled:bg-blue-300 disabled:text-blue-100;
}

.btn-secondary {
@apply bg-white border border-gray-300 text-gray-700 hover:bg-gray-100
        disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200;
}

.btn-danger {
@apply bg-red-600 text-white hover:bg-red-700
        disabled:bg-red-300 disabled:text-red-100;
}

.btn-success {
@apply bg-green-600 text-white hover:bg-green-700
        disabled:bg-green-300 disabled:text-green-100;
}

.btn-dark {
@apply bg-gray-800 text-white hover:bg-gray-900
        disabled:bg-gray-500 disabled:text-gray-300;
}

.btn-gray {
@apply bg-gray-200 hover:bg-gray-300 text-gray-800
        disabled:bg-gray-100 disabled:text-gray-400;
}

.btn-align {
@apply flex flex-row justify-center items-center gap-4;
}
</style>