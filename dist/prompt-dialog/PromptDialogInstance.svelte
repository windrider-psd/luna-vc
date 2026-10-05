<script lang="ts" module>
  type buttoncolor =
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "dark"
    | "gray";
  export type PromptButton = {
    text: string;
    color?: buttoncolor;
    handle?: () => any;
  };
</script>

<script lang="ts">
  type Props = {
    text: string;
    buttons: PromptButton[];
    onHandle?: (i: number) => any;
  };

  let props: Props = $props();

  function handle(button: PromptButton) {
    button.handle?.();
    props.onHandle?.(props.buttons.indexOf(button));
  }
</script>

<div
  class="prompt-container "
>
  <div class="prompt-dialog">
    <h2>
      {props.text}
    </h2>
    <div class="prompt-buttons">
      {#each props.buttons as button}
        <button
          class="btn-{button.color}"
          data-color={button.color}
          onclick={() => handle(button)}
        >
          {button.text}
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  button {
    @apply px-4 py-2 w-full;
  }
  .prompt-container{
    @apply fixed inset-0 flex items-center justify-center bg-black/80 z-[9999];
  }
  .prompt-dialog{
    @apply bg-white rounded-2xl shadow-lg max-w-sm w-full;
  }
  .prompt-dialog h2{
    @apply text-lg font-semibold text-gray-800 p-6 text-center;
  }
  .prompt-dialog > div{
    @apply flex justify-end;
  }
  .prompt-buttons{
    @apply flex justify-end;
  }
</style>
