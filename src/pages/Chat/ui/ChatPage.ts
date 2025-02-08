import { Block, debounce, Router, Store } from '@shared/lib';
import { Button, Link, TextInput } from '@shared/ui';
import { User } from '@entities';
import { ChatController } from '@entities/Chat/api/ChatController';
import { ChatsList } from './ChatsList/ChatsList';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { Chat, WSChatConnector } from '@entities/Chat';
import { ChatFeed } from './ChatFeed/ChatFeed';
import './ChatPage.css';

export class ChatPage extends Block {
    _connector: WSChatConnector;

    constructor() {
        super({
            ToProfileLink: new Link({
                text: 'Профиль',
                href: '/profile',
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
            MessageInput: new TextInput({
                placeholder: 'Сообщение',
                name: 'message',
                type: 'text',
                view: 'filled',
                onkeydown: (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                        this.handleSend();
                    }
                },
            }),
            SendMessageButton: new Button({
                text: '→',
                class: 'primary',
                round: true,
                onclick: () => this.handleSend(),
            }),
        });

        this._connector = new WSChatConnector(Store.getState<User>('user').id);

        Router.instance.onChange(({ param }) => {
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

    handleSend() {
        const input = this.children.MessageInput[0] as TextInput;
        const inputElement = input.element.firstElementChild as HTMLInputElement;
        const message = inputElement.value?.trim();

        if (message === '') {
            return;
        }

        inputElement.value = '';
        this._connector.sendMessage(message);
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
                    <footer class="chat-block__footer">
                        {{{ MessageInput }}}
                        {{{ SendMessageButton }}}
                    </footer>
                </div>
            </div>
        `;
    }
}
