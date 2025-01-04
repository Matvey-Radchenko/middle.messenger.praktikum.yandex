import { createUser, User } from '@entities';
import { Block } from '@shared/lib';
import { UserFormProps } from './UserFormProps';
import './UserForm.css';
import { TextInput } from '@shared/ui';

export class UserForm extends Block {
    onSubmit: UserFormProps['onSubmit'];

    async handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const isValid = this.children['fields'].every((child) =>
            (child as TextInput).validate()
        );

        //TODO arePasswordEqual

        if (!isValid) {
            return;
        }

        this.onSubmit(event);
    }

    constructor({ onSubmit, ...props }: UserFormProps) {
        super({
            ...props,
            onsubmit: (e: SubmitEvent) => this.handleSubmit(e),
        });

        this.onSubmit = onSubmit;
    }

    render() {
        return `    
            <form class="create-account-form">
                <h3>{{title}}</h3>
                {{{fields}}}
                <div class="create-account-form__actions-block">
                    {{{actions}}}
                </div>
            </form>
        `;
    }
}
