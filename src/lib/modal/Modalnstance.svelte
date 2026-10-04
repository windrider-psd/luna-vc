<script lang="ts">
  import { type ModalInit, type ModalResult } from "./ModalManager.svelte";
  import Fa from "svelte-fa";
  import { faX, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
  import { onMount, setContext } from "svelte";
  interface Props {
    modalInit: ModalInit;
  }
  let props: Props = $props();
  let trans = $state(false);

  let tooltips: TooltipData[] = $state([]);
  type TooltipData = {
    icon: IconDefinition;
    action: () => any;
  };

  function createModalTooltip(data: TooltipData) {
    tooltips.unshift(data);
  }
  function close(result:ModalResult){
    props.modalInit.close(result)
  }

  setContext("modal", {createModalTooltip, close})

  onMount(() => {
    setTimeout(() => {
      trans = true;
    }, 100);
  });
</script>

<div
  class="modal-instance-container"
  style="transition: all 0.2s"
  class:top-0={trans}
  class:top-[100vh]={!trans}
>
  <header class="modal-container-header">
    <div
      class="modal-title-container"
    >
      <h2>{props.modalInit.title}</h2>
    </div>
    <div class="modal-tooltip-container">
      {#each tooltips as t}
        <button
          id="filter-button"
          class="modal-tooltip-button"
          onclick={t.action}
        >
          <Fa icon={t.icon}></Fa>
        </button>
      {/each}
      <button
        title="Close"
        onclick={() => {
          props.modalInit.close({
            cancelled: true,
            data: {},
          });
        }}
        aria-controls="generic-modal"
      >
        <Fa icon={faX}></Fa>
      </button>
    </div>
  </header>
  <div class="modal-body">
    {#if props.modalInit.component != null}
      <props.modalInit.component {...props} />
    {/if}
    {#if props.modalInit.snippet != null}
      {@render props.modalInit.snippet(props)}
    {/if}
  </div>
</div>

