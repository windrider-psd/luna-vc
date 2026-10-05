<script lang="ts" module>
  import { mount, unmount, type Component, type Snippet } from "svelte";
  
  import Modalnstance from "./Modalnstance.svelte";

  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

  function uuidv4():string{
      return crypto.randomUUID();
  }
  
  export type ModalContext = {
    createModalTooltip: (data:{
      icon: IconDefinition;
      action: () => any;
    }) =>void;
    close: (result:ModalResult)=>any
  };

  export type ModalInit = {
    id: string;
    component?: Component;
    snippet: Snippet<[any]>;
    resolve: (val: unknown) => void;
    close: (result: ModalResult) => void;
    title: string;
  };
  export type ModalResult<T = any> = {
    cancelled: boolean;
    data: T;
  };
  export type ModalData = {
    instance: any;
    id: string;
    resolve: (val: ModalResult) => void;
  };
  const modals: ModalData[] = [];

  function onModalClose(id: string, result: ModalResult) {
    const index = modals.findIndex((m) => m.id == id);
    if (index > -1) {
      const m = modals[index];

      unmount(m.instance);
      m.resolve(result);
      modals.splice(index, 1);
    }
  }

  function CreateModalData(
    title: string,
    component?: Component<any>,
    snippet?: Snippet<[any]>,
    ...props: any
  ): Promise<ModalResult> {
    const p = props[0];

    return new Promise((resolve) => {
      let id = uuidv4();
      const modal = mount(Modalnstance, {
        target: document.getElementById("modal-container")!,
        props: {
          modalInit: {
            id,
            component,
            snippet,
            resolve,
            title,
            close: function(result:ModalResult){
              onModalClose(this.id, result)
            },
          },
          ...p,
        },
      });
      let data: ModalData = {
        id,
        instance: modal,
        resolve,
      };
      modals.push(data);
    });
  }


  type CreateSnippetModalArgs = {
    title: string,
    snippet: Snippet<[any]>,
    props?: any
  }

  export function OpenSnippetModal<T = any>(args: CreateSnippetModalArgs): Promise<ModalResult<T>> {
    let props = args.props ?? {}

    return CreateModalData(args.title, undefined, args.snippet, props);
  }
  type CreateComponentModalArgs = {
    title: string,
    component: Component<any>,
    props?: any
  }
  export function OpenComponentModal<T = any>(args: CreateComponentModalArgs): Promise<ModalResult<T>> {
    let props = args.props ?? {}
    return CreateModalData(args.title, args.component, undefined, props);
  }

  export function PopModal() {
    if (modals.length > 0) {
      const m = modals[modals.length - 1];
      onModalClose(m.id, { cancelled: true, data: {} });
      return true;
    }
    return false;
  }
  export function CloseAllModals() {
    while (modals.length > 0) {
      PopModal();
    }
  }
</script>

<div id="modal-container"></div>
