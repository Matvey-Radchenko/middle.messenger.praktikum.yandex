export type ButtonProps = {
    id: string;
    text: string;
    type: 'button' | 'submit' | 'reset';
    class: 'primary' | 'secondary';
    rounded?: boolean;
    disabled?: boolean;
};
