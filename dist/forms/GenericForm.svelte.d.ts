import type { FullAutoFill } from "svelte/elements";
import type { IconButtonProps } from "../micro/IconButton.svelte";
type InputType = "text" | "password" | "boolean" | "select" | "number" | "select-simple";
export type GenericFormValidationResult = {
    valid: boolean;
    error: string;
};
type SubmitButton = {
    text: string;
};
export type GenericFormValidator = (value: any) => GenericFormValidationResult | Promise<GenericFormValidationResult>;
export type GenericInputType = {
    label: string;
    id: string;
    type: InputType;
    autocomplete?: FullAutoFill;
    defaultValue?: any;
    required?: boolean;
    disabled?: boolean;
    data?: any;
    secondaryLabel?: string;
    onChange?: (value: any) => any;
    nullify?: boolean;
    key?: any;
    buttons?: IconButtonProps[];
    validate?: GenericFormValidator;
};
export type GenericFormInputGroup = {
    label: string;
    inputs: GenericInputType[];
};
type Props = {
    inputs: GenericInputType[];
    inputGroups?: GenericFormInputGroup[];
    submitButton?: SubmitButton;
    onSubmit: (data: any) => any;
};
declare const GenericForm: import("svelte").Component<Props, {
    setValue: (id: string, value: any) => void;
    getValue: (id: string) => any;
    submit: () => Promise<void>;
    ValidateForm: () => Promise<{
        valid: boolean;
        errors: GenericFormValidationResult[];
    }>;
}, "">;
type GenericForm = ReturnType<typeof GenericForm>;
export default GenericForm;
