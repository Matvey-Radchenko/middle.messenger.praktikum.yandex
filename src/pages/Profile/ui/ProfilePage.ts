import { Block, StoreConnector, Store, isEqual, omit } from '@shared/lib';
import { Button, Link, Modal, TextInput } from '@shared/ui';
import { USER_PROP_NAMES } from '../../../entities/User/model/userPropNames';
import { AuthController, UpdateUserPassword, User, UserController } from '@entities/User';
import { ProfilePageProps } from '../model/types/ProfilePageProps';
import { userSelector } from '@pages/Profile/model/userSelector';
import { USER_PROFILE_INPUTS } from '@pages/Profile/model/userProfileInputs';
import { PASSWORD_INPUTS } from '@pages/Profile/model/passwordInputs';
import { ProfileAvatar } from '@pages/Profile/ui/ProfileAvatar/ProfileAvatar';
import { FileForm } from '@features/FileForm/FileForm';
import './ProfilePage.css';

@StoreConnector<ProfilePageProps>(userSelector)
class ProfilePage extends Block<ProfilePageProps> {
    editMode?: 'user' | 'password' = 'user';

    constructor() {
        const { UserAttributes, ...user } = userSelector(Store.getState());

        const fileForm = new FileForm({
            accept: 'image/*',
            onsubmit: (file: File) => {
                return UserController.updateAvatar(file).then((response) => {
                    (this.children.FileModal[0] as Modal).close();
                    return response;
                });
            },
        });

        super({
            ...user,
            onsubmit: (e: SubmitEvent) => this.handleSumbit(e),
            editMode: false,
            BackLink: new Link({
                text: '❮ Назад',
                href: '/messenger',
            }),
            UserAttributes,
            UserAvatar: new ProfileAvatar({
                onclick: () => (this.children.FileModal[0] as Modal).open(),
            }),
            FileModal: new Modal({
                children: fileForm,
                darkBackdrop: true,
                closable: true,
                onclose: () => fileForm.reset(),
            }),
            ReadModeActions: (
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
                        onclick: () => AuthController.logout(),
                    },
                ] as const
            ).map((action) => new Button(action)),
            EditModeActions: [
                new Button({
                    text: 'Сохранить',
                    class: 'primary',
                    size: 'sm',
                    type: 'submit',
                }),
                new Button({
                    text: 'Отмена',
                    class: 'secondary',
                    size: 'sm',
                    type: 'reset',
                    onclick: () => this.setModeRead(),
                }),
            ],
        });
    }

    setModeEdit(mode: typeof this.editMode) {
        this.editMode = mode;

        let inputs;
        const user = Store.getState<User>('user');

        if (mode === 'user') {
            inputs = USER_PROFILE_INPUTS.map(
                (input) =>
                    new TextInput({
                        ...input,
                        value: user[input.name] || '',
                        placeholder: USER_PROP_NAMES[input.name],
                    })
            );
        } else {
            inputs = PASSWORD_INPUTS.map((input) => new TextInput(input));
        }

        this.setProps({
            editMode: true,
            Inputs: inputs,
        });
    }

    setModeRead() {
        this.setProps({ editMode: false });
    }

    handleSumbit(e: SubmitEvent) {
        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        const currentUser = Store.getState<User>('user');

        const isValid = this.children.Inputs.every((input) =>
            (input as TextInput).validate()
        );

        if (!isValid) {
            return;
        }

        if (this.editMode === 'user') {
            if (!isEqual(data, omit(currentUser, ['avatar', 'id']))) {
                UserController.updateProfile(data as unknown as User);
            }
        } else {
            UserController.updatePassword(data as UpdateUserPassword);
        }

        this.setModeRead();
    }

    render() {
        return `
            <div class="profile-page">
                <div class="profile-page__return-link">
                    {{{ BackLink }}}
                </div>
                <main class="profile-page__content">
                    {{{ UserAvatar }}}
                    {{{ FileModal }}}
                    <h4>{{display_name}}</h4>
                        {{#if editMode}}
                            <form>
                                {{{ Inputs }}}
                                <div class="actions">
                                    {{{ EditModeActions }}}
                                </div>
                            </form>
                        {{else}}
                            <section>
                                {{{ UserAttributes }}}
                                <div class="actions">
                                    {{{ ReadModeActions }}}
                                </div>
                            </section>
                        {{/if}}
                </main>
            </div>
        `;
    }
}

export { ProfilePage };
