import { User, USER_REG_EXPS } from '@entities';
import { Block, connect } from '@shared/lib';
import { AttributeRow, Avatar, Button, Link, TextInput } from '@shared/ui';
import { USER_PROP_NAMES } from '../../../entities/User/model/userPropNames';
import './ProfilePage.css';

class ProfilePage extends Block {
    editMode?: 'user' | 'password';

    constructor(props?: Indexed) {
        const user = props?.user || {};

        super({
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
                        // onclick: () => this.logOut(),
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

        /* this.user = user;
        this.setUser = setUser;
        this.logOut = logOut; */
    }

    setModeEdit(mode: typeof this.editMode) {
        let inputs;

        if (mode === 'user') {
            inputs = (
                [
                    {
                        name: 'email',
                        type: 'email',
                        validation: USER_REG_EXPS.email,
                    },
                    { name: 'login', type: 'text', validation: USER_REG_EXPS.login },
                    {
                        name: 'first_name',
                        type: 'text',
                        validation: USER_REG_EXPS.first_name,
                    },
                    {
                        name: 'second_name',
                        type: 'text',
                        validation: USER_REG_EXPS.second_name,
                    },
                    {
                        name: 'display_name',
                        type: 'text',
                        validation: USER_REG_EXPS.display_name,
                    },
                    { name: 'phone', type: 'tel', validation: USER_REG_EXPS.phone },
                ] as const
            ).map(
                (input) =>
                    new TextInput({
                        ...input,
                        // value: this.user[input.name],
                        placeholder: USER_PROP_NAMES[input.name],
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
                        validation: USER_REG_EXPS.password,
                    },
                    {
                        name: 'new_password_repeat',
                        type: 'password',
                        placeholder: 'Повторите новый пароль',
                        validation: USER_REG_EXPS.password,
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
        console.log(data);

        const isValid = this.children.inputs.every((input) =>
            (input as TextInput).validate()
        );

        if (!isValid) {
            return;
        }

        // this.setUser?.(data as User);

        this.setModeRead();
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

const ProfilePageWithUser = connect(ProfilePage, (state) => ({
    user: state.user,
    userAttributes: (
        Object.entries((state?.user as User) || {}) as Array<[keyof User, string]>
    )?.map(([key, value]) => new AttributeRow({ name: USER_PROP_NAMES[key], value })),
}));

export { ProfilePageWithUser as ProfilePage };
