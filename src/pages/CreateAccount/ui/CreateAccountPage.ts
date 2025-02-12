import { UserForm } from '@features/UserForm';
import { CreateAccountPageProps } from '../model/types/CreateAccountPageProps';
import { Block, Router } from '@shared/lib';
import { Modal } from '@shared/ui/Modal/Modal';
import { Button, TextInput } from '@shared/ui';
import { CREATE_ACCOUNT_FIELDS } from '../model/fields';
import { AuthController, UserProfile } from '@entities/User';

export class CreateAccountPage extends Block {
    onCreateAccount?: CreateAccountPageProps['onCreateAccount'];

    async handleSubmit(event: SubmitEvent) {
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        AuthController.signup(data as unknown as UserProfile);
    }

    constructor() {
        super({
            modal: new Modal({
                visible: true,
                children: new UserForm({
                    title: 'Регистрация',
                    fields: CREATE_ACCOUNT_FIELDS.map((field) => new TextInput(field)),
                    actions: [
                        new Button({
                            type: 'submit',
                            text: 'Зарегистрироваться',
                            class: 'primary',
                        }),
                        new Button({
                            text: 'Войти',
                            onclick: () => Router.instance.go('/'),
                            link: true,
                        }),
                    ],
                    onSubmit: (e) => this.handleSubmit(e),
                }),
            }),
        });
    }

    render() {
        return `
            <div>
                {{{modal}}}
            </div>
        `;
    }
}
