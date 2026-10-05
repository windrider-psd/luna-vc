import type { FullAutoFill, HTMLInputTypeAttribute } from "svelte/elements";
type Props = {
    value: any;
    id: string;
    type: HTMLInputTypeAttribute;
    label: string;
    required: boolean;
    autocomplete?: FullAutoFill;
    disabled?: boolean;
    inputProps?: Record<string, any>;
    onchange?: (value: any) => any;
};
declare const SimpleTextFormInput: import("svelte").Component<Props, {}, "label" | "value" | "disabled">;
type SimpleTextFormInput = ReturnType<typeof SimpleTextFormInput>;
export default SimpleTextFormInput;
