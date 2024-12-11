import { ModalFormTemplate } from '@features/index';
import { LOGIN_ACCOUNT_FIELDS } from './fields';
import { Page } from '@shared';
import { LogInPageProps } from './types/LogInPageProps';
import { logIn } from '@entities/User/api/getUser';
import { LogInData } from '@entities/User';

export class LogInPage implements Page {
    formId = 'login-form';
    onLogIn?: LogInPageProps['onLogIn'];

    constructor({ onLogIn }: LogInPageProps) {
        this.onLogIn = onLogIn;
    }

    async handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        const user = await logIn(data as LogInData);

        if (user) {
            this.onLogIn?.(user);
        }
    }

    attachListeners() {
        const form = document.getElementById(this.formId);
        form?.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    render() {
        return ModalFormTemplate({
            formId: this.formId,
            title: 'Вход',
            fields: LOGIN_ACCOUNT_FIELDS,
            button: {
                id: 'login-submit',
                type: 'submit',
                text: 'Авторизоваться',
                class: 'primary',
            },
            link: {
                text: 'Нет аккаунта?',
                href: '/create-account',
            },
        });
    }
}
