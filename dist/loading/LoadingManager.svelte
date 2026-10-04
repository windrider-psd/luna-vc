<script lang="ts" module>
    import { mount, unmount } from "svelte";
    import LoadingInstance from "./LoadingInstance.svelte";

    export type LoadingInit = {
        promise: Promise<any>[]
        close: (data: LoadingResult, success:boolean) => void;
        title:string
    };
    export type LoadingResult = any

    export function OpenLoading<T>(title:string, promise:Promise<T> | Promise<T>[]): Promise<T> {
        return new Promise((resolve, reject) => {
            console.log("OpenLoading", title, document.getElementById("app"))
            const loading = mount(LoadingInstance, {
                target: document.getElementById("app")!,
                props: {
                    loadingInit: {
                        title,
                        promise: Array.isArray(promise) ? promise : [promise],
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