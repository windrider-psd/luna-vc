import type { PromptButton } from "./PromptDialogInstance.svelte";
export type LoadingInit = {
    promise: Promise<any>[];
    close: (data: LoadingResult, success: boolean) => void;
    title: string;
};
export type LoadingResult = any;
type OpenDialogArgs = {
    text: string;
    buttons: PromptButton[];
};
export declare function OpenDialog(args: OpenDialogArgs): Promise<number>;
export declare function OpenConfirmationDialog(text: string): Promise<boolean>;
export declare function OpenAlert(text: string): Promise<number>;
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
declare const PromptDialogManager: $$__sveltets_2_IsomorphicComponent<Record<string, never>, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type PromptDialogManager = InstanceType<typeof PromptDialogManager>;
export default PromptDialogManager;
