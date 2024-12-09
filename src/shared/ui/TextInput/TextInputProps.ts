export type TextInputProps = Partial<{
    id: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'tel';
    placeholder: string;
    view?: 'filled';
}>;