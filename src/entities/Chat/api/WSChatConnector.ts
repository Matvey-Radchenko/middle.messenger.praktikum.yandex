import { ChatAPI } from '@entities/Chat/api/ChatAPI';
import { Message } from '@entities/Message';
import { Store } from '@shared/lib';
import { loadingDecorator } from '@shared/ui';

export class WSChatConnector {
    userId: number;
    tokens: Record<number, string> = {};
    private _socket: WebSocket | null = null;

    constructor(userId: number) {
        this.userId = userId;
    }

    @loadingDecorator('Устанавливаем соединение...')
    async connect(chatId: number) {
        let token = this.tokens[chatId];

        if (!token) {
            const response = await ChatAPI.getToken({ chatId });

            if (response.ok) {
                token = response.value.token;
                this.tokens[chatId] = token;
            }
        }

        const socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${this.userId}/${chatId}/${token}`
        );

        this._socket = socket;

        socket.onopen = () => {
            console.warn('WS. Соединение установлено');
            this.getMessages(0);
        };
        socket.onclose = (event) => {
            if (event.wasClean) {
                console.warn('WS. Соединение закрыто чисто');
            } else {
                console.warn('WS. Обрыв соединения');
            }

            console.warn(
                `WS. Код: ${event.code}` +
                    (event.reason ? ` | Причина: ${event.reason}` : '')
            );
        };
        socket.onmessage = (e) => this.handleMessage(e);
        socket.onerror = (event) => {
            console.warn('WS. Ошибка', event);
        };
    }

    disconnect() {
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }

    handleMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);

        if (Array.isArray(data) && data[0].type === 'message') {
            Store.set('messages', data);
        } else if (data.type === 'message') {
            Store.set('messages', [data, ...Store.getState<Array<Message>>('messages')]);
        }
    }

    /** limit фиксированный (20) */
    getMessages(offset: number) {
        this._socket?.send(
            JSON.stringify({
                content: String(offset),
                type: 'get old',
            })
        );
    }

    sendMessage(data: string) {
        this._socket?.send(
            JSON.stringify({
                content: data,
                type: 'message',
            })
        );
    }
}
