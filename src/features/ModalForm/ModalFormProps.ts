import { ButtonProps, TextInputProps, LinkProps } from '@shared';

export type ModalFormProps = {
    formId: string;
    title: string;
    fields: Array<TextInputProps>;
    button: ButtonProps;
    link: LinkProps;
};
