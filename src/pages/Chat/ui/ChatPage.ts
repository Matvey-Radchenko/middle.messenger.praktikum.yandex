import { Block } from '@shared/lib';
import { Avatar, Button, Link, TextInput } from '@shared/ui';
import { ChatPreview, Message } from '@entities';
import { CHATS_MOCK_DATA } from '../lib/const/chatsMockData';
import { MESSAGES_MOCK_DATA } from '../lib/const/messagesMockData';
import './ChatPage.css';

export class ChatPage extends Block {
    constructor() {
        super({
            toProfileLink: new Link({
                text: 'Профиль',
                href: '/profile',
                type: 'secondary',
            }),
            searchInput: new TextInput({
                placeholder: 'Поиск',
                name: 'search',
                type: 'text',
                view: 'filled',
            }),
            chats: CHATS_MOCK_DATA.map((chat) => new ChatPreview(chat)),
            avatar: new Avatar({
                src: 'https://img.kupigolos.ru/hero/623e8f7ef3bba.jpg?p=bh&s=7a483e895f3c8ef1120cd83b8047e414',
                initials: 'BS',
                size: 'small',
            }),
            messages: MESSAGES_MOCK_DATA.map((message) => new Message(message)),
            messageInput: new TextInput({
                placeholder: 'Сообщение',
                name: 'message',
                type: 'text',
                view: 'filled',
            }),
            sendMessageButton: new Button({ text: '→', class: 'primary', round: true }),
        });
    }

    render() {
        return `
        <div class="chat-page">
            <sidebar class="left-panel">
                <div class="left-panel__header">
                    {{{ toProfileLink }}}
                    {{{ searchInput }}} 
                </div>
                <div class="chat-list">
                    {{{ chats }}}
                </div>
            </sidebar>

            <div class="chat-block">
                <header class="chat-block__header">
                    {{{ avatar }}}
                    <h4>Винсент Вега</h4>
                </header>
                <main class="chat-block__content">
                    {{{ messages }}}
                </main>
                <footer class="chat-block__footer">
                    {{{ messageInput }}}
                    {{{ sendMessageButton }}}
                </footer>
            </div>
        </div>
        `;
    }
}
