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
    import { onMount } from "svelte";

  type Props = {
    text: string;
    buttons: PromptButton[];
    onHandle?: (i: number) => any;
  };


  let buttons: HTMLButtonElement[] = [];

  let props: Props = $props();

  function handle(button: PromptButton) {
    button.handle?.();
    props.onHandle?.(props.buttons.indexOf(button));
  }

  onMount(()=>{
    buttons[0].focus()
  })
</script>

<div
  class="prompt-container "
>
  <div class="prompt-dialog">
    <h2>
      {props.text}
    </h2>
    <div class="prompt-buttons">
      {#each props.buttons as button, i}
        <button
          bind:this={buttons[i]}
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
