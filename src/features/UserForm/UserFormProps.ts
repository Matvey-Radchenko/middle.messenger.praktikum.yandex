import { Block } from '@shared/lib';

export type UserFormProps = {
    title: string;
    fields: Array<Block>;
    onSubmit: (data: SubmitEvent) => void;
    actions: Array<Block>;
};
