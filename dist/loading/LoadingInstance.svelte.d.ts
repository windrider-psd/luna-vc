import type { LoadingInit } from "./LoadingManager.svelte";
interface Props {
    loadingInit: LoadingInit;
}
declare const LoadingInstance: import("svelte").Component<Props, {}, "">;
type LoadingInstance = ReturnType<typeof LoadingInstance>;
export default LoadingInstance;
