interface Props {
    label?: string;
    design?: string;
    options?: string[];
    fontSize?: number;
    value?: boolean;
    locked?: boolean;
    id?: string;
    onchange?: (value: boolean) => any;
}
declare const Switch: import("svelte").Component<Props, {}, "value">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
