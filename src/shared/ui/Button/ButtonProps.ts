import { Block } from '@shared/lib';

export type ButtonProps = {
    id?: string;
    text: string | number | Block;
    type?: 'button' | 'submit' | 'reset';
    class?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    round?: boolean;
    disabled?: boolean;
    link?: string;
    onclick?: () => void;
};
