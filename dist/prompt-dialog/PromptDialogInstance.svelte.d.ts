type buttoncolor = "primary" | "secondary" | "danger" | "success" | "dark" | "gray";
export type PromptButton = {
    text: string;
    color?: buttoncolor;
    handle?: () => any;
};
type Props = {
    text: string;
    buttons: PromptButton[];
    onHandle?: (i: number) => any;
};
declare const PromptDialogInstance: import("svelte").Component<Props, {}, "">;
type PromptDialogInstance = ReturnType<typeof PromptDialogInstance>;
export default PromptDialogInstance;
