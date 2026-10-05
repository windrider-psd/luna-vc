import { type Component, type Snippet } from "svelte";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
export type ModalContext = {
    createModalTooltip: (data: {
        icon: IconDefinition;
        action: () => any;
    }) => void;
    close: (result: ModalResult) => any;
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
type CreateSnippetModalArgs = {
    title: string;
    snippet: Snippet<[any]>;
    props?: any;
};
export declare function OpenSnippetModal<T = any>(args: CreateSnippetModalArgs): Promise<ModalResult<T>>;
type CreateComponentModalArgs = {
    title: string;
    component: Component<any>;
    props?: any;
};
export declare function OpenComponentModal<T = any>(args: CreateComponentModalArgs): Promise<ModalResult<T>>;
export declare function PopModal(): boolean;
export declare function CloseAllModals(): void;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const ModalManager: $$__sveltets_2_IsomorphicComponent<Record<string, never>, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type ModalManager = InstanceType<typeof ModalManager>;
export default ModalManager;
