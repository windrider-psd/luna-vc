type Props = {
    value: boolean;
    id: string;
    label: string;
    onchange?: (value: boolean) => any;
};
declare const BooleanFormInput: import("svelte").Component<Props, {}, "value">;
type BooleanFormInput = ReturnType<typeof BooleanFormInput>;
export default BooleanFormInput;
