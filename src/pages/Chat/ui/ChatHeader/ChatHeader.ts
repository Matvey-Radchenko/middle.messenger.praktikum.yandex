import { Block, StoreConnector } from '@shared/lib';
import { Avatar } from '@shared/ui/Avatar/Avatar';
import { Button, Modal } from '@shared/ui';
import { ChangeUsersForm } from '@pages/Chat/ui/ChatHeader/ChangeUsersForm';
import { Chat } from '@entities/Chat';
import './ChatHeader.css';

type ChatHeaderProps = {
    Avatar?: Avatar;
    ChangeUsersModal: Modal;
    currentChat?: Chat;
    AddUserButton: Button;
    DeleteUserButton: Button;
};

@StoreConnector<ChatHeaderProps>((state) => {
    const currentChat = state.currentChat as Chat;

    if (!currentChat) {
        return {};
    }

    return {
        Avatar: new Avatar({
            src: currentChat.avatar,
            initials: currentChat.title.slice(0, 1),
            size: 'small',
        }),
        currentChat,
    };
})
export class ChatHeader extends Block<ChatHeaderProps> {
    private _form: ChangeUsersForm | null = null;

    constructor() {
        const form = new ChangeUsersForm();

        super({
            ChangeUsersModal: new Modal({
                children: form as Block,
                closable: true,
                darkBackdrop: true,
            }),
            AddUserButton: new Button({
                text: '+',
                class: 'secondary',
                round: true,
                size: 'sm',
                onclick: () => this.openModal('add'),
            }),
            DeleteUserButton: new Button({
                text: '×',
                class: 'secondary',
                round: true,
                size: 'sm',
                onclick: () => this.openModal('delete'),
            }),
        });

        this._form = form;
    }

    openModal(action: 'add' | 'delete') {
        const modal = this.children.ChangeUsersModal[0] as Modal;
        modal.open();
        this._form?.setProps({ isAdding: action === 'add' });
    }

    render() {
        return `
			<header class="chat-header">
				{{#if currentChat}}
					{{{ Avatar }}}
					<h4>{{ currentChat.title }}</h4>

					<div class="chat-header__buttons">
						{{{ AddUserButton }}}
						{{{ DeleteUserButton }}}
					</div>

					{{{ ChangeUsersModal }}}
				{{ else }}
					<h4>Выберите чат</h4>
				{{/if}}
			</header>
		`;
    }
}
