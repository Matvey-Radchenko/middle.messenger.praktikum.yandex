import { Block, debounce, Router, Store } from '@shared/lib';
import { Link, TextInput } from '@shared/ui';
import { User } from '@entities';
import { ChatController } from '@entities/Chat/api/ChatController';
import { ChatsList } from './ChatsList/ChatsList';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { Chat, WSChatConnector } from '@entities/Chat';
import { ChatFeed } from './ChatFeed/ChatFeed';
import { ChatFooter } from '@pages/Chat/ui/ChatFooter/ChatFooter';
import './ChatPage.css';

export class ChatPage extends Block {
    _connector: WSChatConnector;

    constructor() {
        const connector = new WSChatConnector(Store.getState<User>('user').id);

        super({
            ToProfileLink: new Link({
                text: 'Профиль',
                href: '/settings',
                type: 'secondary',
            }),
            SearchInput: new TextInput({
                placeholder: 'Поиск',
                name: 'search',
                type: 'text',
                view: 'filled',
                oninput: (e: Event) => this.handleSearchChange(e),
            }),
            ChatsList: new ChatsList(),
            ChatHeader: new ChatHeader(),
            ChatFeed: new ChatFeed(),
            ChatFooter: new ChatFooter({ connector }),
        });

        this._connector = connector;

        Router.instance.onChange(({ param }) => {
            Store.set('messages', []);

            const chatId = Number(param);
            const chat = Store.getState<Array<Chat>>('chats').find(
                (chat) => chat.id === chatId
            );

            if (!chat) {
                return;
            }

            Store.set('currentChat', chat);
            this._connector.disconnect();
            this._connector.connect(chatId);
        });
    }

    @debounce(1000)
    handleSearchChange(e: Event) {
        const title = (e.target as HTMLInputElement).value;

        ChatController.getChats({ title, offset: 0, limit: 100 });
    }

    render() {
        return `
            <div class="chat-page">
                <sidebar class="left-panel">
                    <div class="left-panel__header">
                        {{{ ToProfileLink }}}
                        {{{ SearchInput }}} 
                    </div>
                    {{{ ChatsList }}}
                </sidebar>
                <div class="chat-block">
                    {{{ ChatHeader }}}
                    {{{ ChatFeed }}}
                    {{{ ChatFooter }}}
                </div>
            </div>
        `;
    }
}
