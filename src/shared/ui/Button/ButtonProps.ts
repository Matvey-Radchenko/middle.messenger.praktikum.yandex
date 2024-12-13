export type ButtonProps = {
    id: string;
    text: string;
    type: 'button' | 'submit' | 'reset';
    class: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    round?: boolean;
    disabled?: boolean;
};
