type Props = {
    value: any;
    id: string;
    label: string;
    required: boolean;
    data: {
        value: string;
        label: string;
    }[];
    onchange?: (value: any) => any;
    disabled?: boolean;
};
declare const SimpleSelectFormInput: import("svelte").Component<Props, {}, "value" | "disabled">;
type SimpleSelectFormInput = ReturnType<typeof SimpleSelectFormInput>;
export default SimpleSelectFormInput;
