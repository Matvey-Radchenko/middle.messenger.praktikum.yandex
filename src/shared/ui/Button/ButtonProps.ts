export type ButtonProps = {
    id: string;
    type: 'button' | 'submit' | 'reset';
    text: string;
    class?: string;
    disabled?: boolean;
};
