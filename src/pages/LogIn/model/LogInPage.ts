import { LoginFormData } from './types/LogInFormData';
import { ModalFormTemplate } from '@features/index';
import { LOGIN_ACCOUNT_FIELDS } from './fields';

class LogIn {
    formId = 'login-form';
    formState: LoginFormData = {
        login: '',
        password: '',
    };

    attachListeners() {
        const form = document.getElementById(this.formId);
        form?.addEventListener('submit', (event) => this.onSubmit(event));
    }

    onSubmit(event: SubmitEvent) {
        event.preventDefault();
        console.log(this.formState);
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

export const LogInPage = new LogIn();
