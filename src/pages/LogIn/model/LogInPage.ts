import { LOGIN_ACCOUNT_FIELDS } from './fields';
import { LogInPageProps } from './types/LogInPageProps';
import { logIn } from '@entities/User/api/getUser';
import { LogInData } from '@entities/User';
import { Block } from '@shared/lib';
import { UserForm } from '@features/UserForm';
import { Button, Modal, TextInput } from '@shared/ui';

export class LogInPage extends Block {
    onLogIn: LogInPageProps['onLogIn'];

    async handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        const user = await logIn(data as LogInData);

        if (user) {
            this.onLogIn(user);
        }
    }

    constructor({ onLogIn }: LogInPageProps) {
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

        this.onLogIn = onLogIn;
    }

    render() {
        return `
            <div>
                {{{modal}}}
            </div>
        `;
    }
}
