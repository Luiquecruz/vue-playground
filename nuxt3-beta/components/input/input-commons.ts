export interface InputProps {
    autocomplete?: boolean,
    autofocus?: boolean,
    id: number | string,
    name: string | number,
    label?: string,
    placeholder?: string,
    modelValue?: string | number,
    type: string,
    max?: number | string,
    min?: number | string,
    hint?: string,
    readonly?: boolean,
    required?: boolean,
    disabled?: boolean,
}

export const useInputProps = {
    autocomplete: {
        type: Boolean,
        required: false,
        default: false,
    },
    autofocus: {
        type: Boolean,
        required: false,
        default: false,
    },
    id: {
        type: [String, Number],
        required: true,
    },
    name: {
        type: [String, Number],
        required: true,
    },
    label: {
        type: String,
        required: false,
        default: '',
    },
    placeholder: {
        type: String,
        required: false,
        default: '',
    },
    type: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        required: false,
        default: '',
    },
    max: {
        type: [Number, String],
        required: false,
        default: '',
    },
    min: {
        type: [Number, String],
        required: false,
        default: '',
    },
    hint: {
        type: String,
        required: false,
        default: '',
    },
    readonly: {
        type: Boolean,
        required: false,
        default: false,
    },
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
};
