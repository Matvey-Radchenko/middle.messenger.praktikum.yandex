export type ButtonProps = {
    id: string;
    text: string;
    type: 'button' | 'submit' | 'reset';
    class: 'primary' | 'secondary';
    disabled?: boolean;
};
