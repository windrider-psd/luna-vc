export type LoadingInit = {
    promise: Promise<any>[];
    close: (data: LoadingResult, success: boolean) => void;
    title: string;
};
export type LoadingResult = any;
export declare function OpenLoading<T>(title: string, promise: Promise<T> | Promise<T>[]): Promise<T>;
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
declare const LoadingManager: $$__sveltets_2_IsomorphicComponent<Record<string, never>, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type LoadingManager = InstanceType<typeof LoadingManager>;
export default LoadingManager;
