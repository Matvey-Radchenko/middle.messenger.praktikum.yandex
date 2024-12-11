import { ModalFormTemplate } from '@features';
import { CREATE_ACCOUNT_FIELDS } from './fields';
import { CreateAccountPageProps } from './types/CreateAccountPageProps';
import { Page } from '@shared';
import { createUser, User } from '@entities';

export class CreateAccountPage implements Page {
    formId = 'create-account-form';

    onCreateAccount?: CreateAccountPageProps['onCreateAccount'];

    constructor({ onCreateAccount }: CreateAccountPageProps) {
        this.onCreateAccount = onCreateAccount;
    }

    attachListeners() {
        const form = document.getElementById(this.formId);
        form?.addEventListener('submit', (event) => this.onSubmit(event));
    }

    async onSubmit(event: SubmitEvent) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        const user = await createUser(data as User);
        this.onCreateAccount?.(user);
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
