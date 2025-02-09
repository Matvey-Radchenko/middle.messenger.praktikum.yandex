import { Block, StoreConnector } from '@shared/lib';
import { Button, TextInput } from '@shared/ui';
import { Chat, WSChatConnector } from '@entities/Chat';
import './ChatFooter.css';

type ChatFooterProps = {
    currentChat?: Chat;
    MessageInput: TextInput;
    SendMessageButton: Button;
    onsubmit: (e: SubmitEvent) => void;
};

@StoreConnector<ChatFooterProps>((state) => {
    const currentChat = state.currentChat as Chat;

    return {
        currentChat,
    };
})
export class ChatFooter extends Block<ChatFooterProps> {
    _connector: WSChatConnector;

    constructor({ connector }: { connector: WSChatConnector }) {
        super({
            MessageInput: new TextInput({
                placeholder: 'Сообщение',
                name: 'message',
                type: 'text',
                view: 'filled',
            }),
            SendMessageButton: new Button({
                text: '→',
                class: 'primary',
                type: 'submit',
                round: true,
            }),
            onsubmit: (e: SubmitEvent) => this.handleSubmit(e),
        });
        this._connector = connector;
    }

    handleSubmit(event: SubmitEvent) {
        const form = event.target as HTMLFormElement;
        const inputElement = form.querySelector('input') as HTMLInputElement;
        const data = new FormData(form);
        const message = data.get('message') as string;

        if (message === '') {
            return;
        }

        inputElement.value = '';
        this._connector.sendMessage(message);
    }

    render() {
        return `
			<footer class="chat-footer">
				{{#if currentChat}}
					<form>
						{{{ MessageInput }}}
						{{{ SendMessageButton }}}
					</form>
				{{/if}}
			</footer>
		`;
    }
}
