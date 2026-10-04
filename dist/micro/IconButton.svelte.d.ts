import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
export type ButtonColor = "primary" | "secondary" | "danger" | "success" | "dark" | "gray";
export type IconButtonProps = {
    text: string;
    icon: IconDefinition;
    color?: ButtonColor;
    onclick?: (data?: any) => any;
    data?: any;
    fullWidth?: boolean;
    disabledState?: boolean;
};
declare const IconButton: import("svelte").Component<IconButtonProps, {}, "data">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
