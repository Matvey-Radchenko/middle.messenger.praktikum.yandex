import { Block } from '@shared/lib';

export type ModalProps = {
    children: Block;
    darkBackdrop?: boolean;
    class?: string;
    visible?: boolean;
    closable?: boolean;
    onclose?: () => void;
};
