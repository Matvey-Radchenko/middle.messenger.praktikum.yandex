import { LOGIN_ACCOUNT_FIELDS } from '../model/fields';
import { LogInData, AuthController } from '@entities/User';
import { Block } from '@shared/lib';
import { UserForm } from '@features/UserForm';
import { Button, Modal, TextInput } from '@shared/ui';

export class LogInPage extends Block {
    async handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        AuthController.signin(data as LogInData);
    }

    constructor() {
        super({
            modal: new Modal({
                children: new UserForm({
                    title: 'Вход',
                    fields: LOGIN_ACCOUNT_FIELDS.map((field) => new TextInput(field)),
                    actions: [
                        new Button({
                            id: 'login-submit',
                            type: 'submit',
                            text: 'Авторизоваться',
                            class: 'primary',
                        }),
                        new Button({
                            text: 'Нет аккаунта?',
                            link: '/create-account',
                        }),
                    ],
                    onSubmit: (e) => this.handleSubmit(e),
                }),
            }),
        });

        // this.onLogIn = onLogIn;
    }

    render() {
        return `
            <div>
                {{{modal}}}
            </div>
        `;
    }
}
