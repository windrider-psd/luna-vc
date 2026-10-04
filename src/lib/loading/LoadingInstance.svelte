<script lang="ts">
    import { onMount } from "svelte";
    import type { LoadingInit } from "./LoadingManager.svelte";
    import LoadingCircle from "../micro/LoadingCircle.svelte";
    
    interface Props {
        loadingInit: LoadingInit;
    }

    let props: Props = $props();

    onMount(async ()=>{
        try{
            if(props.loadingInit.promise.length == 1){
                const data = await props.loadingInit.promise[0]
                props.loadingInit.close(data, true)
            }
            else{
                const data = []

                for(const p of props.loadingInit.promise){
                    data.push(await p)
                }
                props.loadingInit.close(data, true)
            }
        }
        catch(ex){
            //@ts-ignore
            props.loadingInit.close(ex, false)
        }
    })
</script>

<div
    class="loading-container"
>
    <div class="loading-minor">
        <LoadingCircle />
        {props.loadingInit.title}
    </div>
</div>



