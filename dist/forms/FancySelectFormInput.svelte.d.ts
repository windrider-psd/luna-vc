type Props = {
    value: any;
    id: string;
    justValue?: any;
    label: string;
    required: boolean;
    data: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
    onchange?: (value: any) => any;
};
declare const FancySelectFormInput: import("svelte").Component<Props, {}, "value" | "justValue">;
type FancySelectFormInput = ReturnType<typeof FancySelectFormInput>;
export default FancySelectFormInput;
