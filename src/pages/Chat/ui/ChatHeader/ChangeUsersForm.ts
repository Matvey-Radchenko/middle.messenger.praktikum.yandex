import { Block, StoreConnector } from '@shared/lib';
import { TextInput } from '@shared/ui/TextInput';
import { Button } from '@shared/ui/Button';
import { Chat, ChatController } from '@entities/Chat';
import { UserController } from '@entities/User';
import './ChangeUsersForm.css';

type ChangeUsersFormProps = {
    isAdding: boolean;
    Input: TextInput;
    Button: Button;
    currentChat?: Chat;
    onsubmit: (e: SubmitEvent) => void;
};

@StoreConnector<ChangeUsersFormProps>((store) => {
    const currentChat = store.currentChat as Chat;
    return { currentChat };
})
export class ChangeUsersForm extends Block<ChangeUsersFormProps> {
    constructor() {
        super({
            isAdding: true,
            Input: new TextInput({
                placeholder: 'Логин пользователя',
                name: 'login',
                type: 'text',
            }),
            Button: new Button({
                text: 'Отправить',
                class: 'primary',
                type: 'submit',
                size: 'sm',
            }),
            onsubmit: (e: SubmitEvent) => this.handleSubmit(e),
        });
    }

    async handleSubmit(e: SubmitEvent) {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const users = await UserController.search(formData.get('login') as string);

        if (!users.length) {
            alert('Пользователь не найден');
            return;
        }

        ChatController[this.props.isAdding ? 'addUsersToChat' : 'deleteUsersFromChat']({
            chatId: Number(this.props.currentChat?.id),
            users: users.map((user) => user.id),
        });
    }

    render() {
        return `
			<form class="change-users-form">
				<h3>{{#if isAdding}}Добавить {{else}}Удалить {{/if}}пользователя</h3>
				{{{ Input }}}
				{{{ Button }}}
			</form>
		`;
    }
}
