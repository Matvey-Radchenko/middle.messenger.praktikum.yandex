import { ButtonProps, InputProps } from '@shared/index';

export type ModalFormProps = {
    formId: string;
    title: string;
    fields: Array<InputProps>;
    buttons: Array<ButtonProps>;
};
