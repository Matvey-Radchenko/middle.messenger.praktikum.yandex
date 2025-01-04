import { LogInData, User } from '@entities';
import { Block } from '@shared/lib';
import { AttributeRow, Avatar, Button, Link, TextInput } from '@shared/ui';
import { USER_PROP_NAMES } from '../model/userPropNames';
import './ProfilePage.css';

export class ProfilePage extends Block {
    user: User;

    setUser;
    logOut;
    editMode?: 'user' | 'password';

    setModeEdit(mode: typeof this.editMode) {
        let inputs;

        if (mode === 'user') {
            inputs = (
                [
                    { name: 'email', type: 'email' },
                    { name: 'login', type: 'text' },
                    { name: 'first_name', type: 'text' },
                    { name: 'second_name', type: 'text' },
                    { name: 'display_name', type: 'text' },
                    { name: 'phone', type: 'tel' },
                ] as const
            ).map(
                ({ name, type }) =>
                    new TextInput({
                        name,
                        type,
                        value: this.user[name],
                        placeholder: USER_PROP_NAMES[name],
                    })
            );
        } else {
            inputs = (
                [
                    { name: 'password', type: 'password', placeholder: 'Старый пароль' },
                    {
                        name: 'new_password',
                        type: 'password',
                        placeholder: 'Новый пароль',
                    },
                    {
                        name: 'new_password_repeat',
                        type: 'password',
                        placeholder: 'Повторите новый пароль',
                    },
                ] as const
            ).map(
                ({ name, type, placeholder }) =>
                    new TextInput({
                        name,
                        type,
                        placeholder,
                    })
            );
        }

        this.setProps({
            editMode: true,
            inputs,
        });
    }

    setModeRead() {
        this.setProps({ editMode: false });
    }

    handleSumbit(e: SubmitEvent) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        if (this.editMode === 'password') {
            console.log(data);
        } else {
            console.log(data);
        }

        // this.setUser?.(data as User);

        this.setModeRead();
    }

    constructor(user: User, setUser: (user: User) => void, logOut: () => void) {
        super({
            ...user,
            onsubmit: (e: SubmitEvent) => this.handleSumbit(e),
            editMode: false,
            backLink: new Link({
                text: '< назад',
                href: '/chat',
            }),
            userAvatar: new Avatar({
                src: 'https://sun1-47.userapi.com/s/v1/ig2/J4tV5J9d2XW2_HeaoE_tHhBMNbrTvy7h5zjPbgYw-7opMxvybxS49Ig7cOUnr0gVEA9uGUJDZGlvfrRrwDpQGb8o.jpg?quality=95&as=32x31,48x46,72x69,108x104,160x154,240x231,360x346,480x462,540x519,640x616,720x693,735x707&from=bu&u=p8W56VA_LlspHhMGsdv9mUjamvyE-yDxtoGME6PDIZA&cs=604x581',
                initials: 'CG',
                size: 'xlarge',
            }),
            userAttributes: (Object.entries(user) as Array<[keyof User, string]>).map(
                ([key, value]) => new AttributeRow({ name: USER_PROP_NAMES[key], value })
            ),
            actions: (
                [
                    {
                        text: 'Изменить данные',
                        class: 'primary',
                        size: 'sm',
                        onclick: () => this.setModeEdit('user'),
                    },
                    {
                        text: 'Изменить пароль',
                        class: 'primary',
                        size: 'sm',
                        onclick: () => this.setModeEdit('password'),
                    },
                    {
                        text: 'Выйти',
                        class: 'danger',
                        size: 'sm',
                        onclick: () => this.logOut(),
                    },
                ] as const
            ).map((action) => new Button(action)),
            saveButton: new Button({
                text: 'Сохранить',
                class: 'primary',
                size: 'sm',
                type: 'submit',
            }),
        });

        this.user = user;
        this.setUser = setUser;
        this.logOut = logOut;
    }

    render() {
        return `
            <div class="profile-page">
                <div class="profile-page__return-link">
                    {{{ backLink }}}
                </div>
                <main class="profile-page__content">
                    {{{ userAvatar }}}
                    <h4>{{display_name}}</h4>
                        {{#if editMode}}
                            <form>
                                {{{ inputs }}}
                                <div class="actions">
                                    {{{ saveButton }}}
                                </div>
                            </form>
                        {{else}}
                            <section>
                                {{{ userAttributes }}}
                                <div class="actions">
                                    {{{ actions }}}
                                </div>
                            </section>
                        {{/if}}
                </main>
            </div>
        `;
    }
}
