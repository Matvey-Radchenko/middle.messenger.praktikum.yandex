import { createUser, User } from '@entities';
import { Block } from '@shared/lib';
import { UserFormProps } from './UserFormProps';
import './UserForm.css';

export class UserForm extends Block {
    onSubmit: UserFormProps['onSubmit'];

    async handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        this.onSubmit(event);
    }

    constructor({ onSubmit, ...props }: UserFormProps) {
        super({
            ...props,
            onsubmit: (e: SubmitEvent) => {
                this.handleSubmit(e);
            },
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
