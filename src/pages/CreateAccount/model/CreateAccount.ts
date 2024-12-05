import Handlebars from 'handlebars';
import { CreateAccountState } from './types/CreateAccountState';
import { ModalForm } from '@features/index';
import { CREATE_ACCOUNT_FIELDS } from '@pages/CreateAccount/model/fields';

export class CreateAccount {
    formId = 'create-account';
    formState: CreateAccountState = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        password: '',
        phone: '',
        passwordRepeat: '',
    };

    componentDidMount: boolean = false;
    isSubmitActive: boolean = false;

    constructor() {
        // attachListeners();
    }

    attachListeners() {
        const form = document.getElementById(this.formId);
        console.log('CreateAccount ~ attachListeners ~ form:', form);
        form?.addEventListener('input', (event) => {
            console.log(event);

            // this.onChange
        });
    }

    validate() {
        this.isSubmitActive = true;
        this.render();
    }

    onChange(payload: Partial<CreateAccountState>) {
        Object.assign(this.formState, payload);
        this.validate();
    }

    onSubmit() {}

    render() {
        return ModalForm({
            formId: this.formId,
            title: 'Регистрация',
            fields: CREATE_ACCOUNT_FIELDS,
            buttons: [
                {
                    id: 'create-account',
                    type: 'submit',
                    text: 'Зарегистрироваться',
                    class: 'primary',
                },
                {
                    id: 'cancel',
                    type: 'button',
                    text: 'Войти',
                    class: 'link',
                },
            ],
        });
    }
}
