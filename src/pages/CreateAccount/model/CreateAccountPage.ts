import { UserForm } from '@features/UserForm';
import { CreateAccountPageProps } from './types/CreateAccountPageProps';
import { Block } from '@shared/lib';
import { Modal } from '@shared/ui/Modal/Modal';
import { Button, TextInput } from '@shared/ui';
import { CREATE_ACCOUNT_FIELDS } from './fields';
import { createUser, User } from '@entities/User';

export class CreateAccountPage extends Block {
    onCreateAccount: CreateAccountPageProps['onCreateAccount'];

    async handleSubmit(event: SubmitEvent) {
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        const user = await createUser(data as User);
        console.log('CreateAccountPage ~ handleSubmit ~ data:', data);

        if (user) {
            this.onCreateAccount(user);
        }
    }

    constructor({ onCreateAccount }: CreateAccountPageProps) {
        super({
            modal: new Modal({
                children: new UserForm({
                    title: 'Регистрация',
                    fields: CREATE_ACCOUNT_FIELDS.map((field) => new TextInput(field)),
                    actions: [
                        new Button({
                            type: 'submit',
                            text: 'Зарегистрироваться',
                            class: 'primary',
                        }),
                        new Button({ text: 'Войти', link: '/login' }),
                    ],
                    onSubmit: (e) => this.handleSubmit(e),
                }),
            }),
        });

        this.onCreateAccount = onCreateAccount;
    }

    render() {
        return `
            <div>
                {{{modal}}}
            </div>
        `;
    }
}
