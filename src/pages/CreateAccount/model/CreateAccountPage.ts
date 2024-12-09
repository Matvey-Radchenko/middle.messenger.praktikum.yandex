import { CreateAccountFormData } from './types/CreateAccountFormData';
import { ModalFormTemplate } from '@features/index';
import { CREATE_ACCOUNT_FIELDS } from '@pages/CreateAccount/model/fields';
import { Page } from '@shared/index';

export class CreateAccountPage implements Page {
    formId = 'create-account-form';
    formState: CreateAccountFormData = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        password: '',
        phone: '',
        passwordRepeat: '',
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
            title: 'Регистрация',
            fields: CREATE_ACCOUNT_FIELDS,
            button: {
                id: 'create-account-submit',
                type: 'submit',
                text: 'Зарегистрироваться',
                class: 'primary',
            },
            link: { text: 'Войти', href: '/login' },
        });
    }
}
