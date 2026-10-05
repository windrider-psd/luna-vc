<script lang="ts" module>
    import { mount, unmount } from "svelte";
    import LoadingInstance from "./LoadingInstance.svelte";

    export type LoadingInit = {
        promise: Promise<any>[]
        close: (data: LoadingResult, success:boolean) => void;
        title:string
    };
    export type LoadingResult = any
    type OpenLoadingArgs<T> ={
        title:string,
        promise:Promise<T> | Promise<T>[]
    }
    export function OpenLoading<T>(args: OpenLoadingArgs<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            let container = document.getElementById("app") ?? document.querySelector("body")
            const loading = mount(LoadingInstance, {
                target: container!,
                props: {
                    loadingInit: {
                        title:args.title,
                        promise: Array.isArray(args.promise) ? args.promise : [args.promise],
                        close: (result: any, success:boolean) => {
                            unmount(loading);
                            success ? resolve(result) : reject(result)                
                        },
                    }
                },
            });
        });
    }
</script>