<script lang="ts" module>
    import { mount, unmount } from "svelte";
  import type { PromptButton } from "./PromptDialogInstance.svelte";
  import PromptDialogInstance from "./PromptDialogInstance.svelte";

    export type LoadingInit = {
        promise: Promise<any>[]
        close: (data: LoadingResult, success:boolean) => void;
        title:string
    };
    export type LoadingResult = any

    type OpenDialogArgs = {
        text:string,
        buttons:PromptButton[]
    }
    export function OpenDialog(args:OpenDialogArgs): Promise<number> {
        return new Promise((resolve) => {
            let container = document.getElementById("app") ?? document.querySelector("body")
            const instance = mount(PromptDialogInstance, {
                target: container!,
                props: {
                    buttons:args.buttons,
                    text:args.text,
                    onHandle:(i)=>{
                        unmount(instance)
                        resolve(i)
                    }
                },
            });
        });
    }

    export async function OpenConfirmationDialog(text:string): Promise<boolean>{
        const result = await OpenDialog({
            text,
            buttons:[
                {
                    text:"Sim",
                    color:"primary",
                },
                {
                    text: "Não",
                    color:"gray"
                },
            ]
        })
        return result == 0
    }

     export function OpenAlert(text:string) {
        
        return OpenDialog({
            text,
            buttons:[
                {
                    text:"Ok.",
                    color:"primary",
                }
            ]
        })
    }
</script>