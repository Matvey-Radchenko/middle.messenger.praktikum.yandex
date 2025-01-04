export type TextInputProps = {
    id?: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'tel';
    placeholder?: string;
    value?: string;
    view?: 'filled';
    validation?: {
        regExp: RegExp;
        errorText: string;
    };
};
