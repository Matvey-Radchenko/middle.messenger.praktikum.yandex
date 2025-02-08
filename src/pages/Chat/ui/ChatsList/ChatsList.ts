import { Block, StoreConnector } from '@shared/lib';
import { Chat, ChatController, ChatPreview } from '@entities/Chat';
import { User } from '@entities/User';
import { AddChatForm } from './AddChatForm';
import { Button, Modal } from '@shared/ui';
import './ChatsList.css';

type ChatListProps = {
    Chats?: Array<ChatPreview>;
    AddChatButton: Button;
    AddChatModal: Modal;
};

@StoreConnector<ChatListProps>((state) => {
    const chats = (state.chats as Array<Chat>) || [];
    const user = state.user as User;

    return {
        Chats: chats.map(({ last_message, ...restChatProps }) => {
            return new ChatPreview({
                ...restChatProps,
                last_message: {
                    ...last_message,
                    time: last_message
                        ? new Date(last_message?.time).toLocaleTimeString()
                        : '',
                    outgoing: user?.login === last_message?.user.login,
                },
            });
        }),
    };
})
export class ChatsList extends Block<ChatListProps> {
    constructor() {
        super({
            AddChatButton: new Button({
                text: 'Создать чат +',
                class: 'link',
                size: 'sm',
                onclick: () => (this.children.AddChatModal[0] as Modal).open(),
            }),
            Chats: [],
            AddChatModal: new Modal({
                children: new AddChatForm(),
                darkBackdrop: true,
                closable: true,
                onclose: () => console.log('close'),
            }),
        });

        ChatController.getChats({ offset: 0, limit: 100 });
    }

    render() {
        return `
			<div class="chat-list">
				{{{ Chats }}}
				{{{ AddChatButton }}}
				{{{ AddChatModal }}}
			</div>
		`;
    }
}
