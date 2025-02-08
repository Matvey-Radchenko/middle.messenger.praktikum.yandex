import { Block } from '@shared/lib';
import { TextInput } from '@shared/ui/TextInput';
import { Button } from '@shared/ui/Button';
import './AddChatForm.css';
import { ChatController } from '@entities/Chat';

export class AddChatForm extends Block {
    constructor() {
        super({
            Input: new TextInput({
                placeholder: 'Название чата',
                name: 'title',
                type: 'text',
            }),
            Button: new Button({
                text: 'Создать',
                class: 'primary',
                type: 'submit',
                size: 'sm',
            }),
            onsubmit: (e: SubmitEvent) => {
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                ChatController.createChat({
                    title: formData.get('title') as string,
                });
            },
        });
    }

    render() {
        return `
			<form class="add-chat-form">
				<h3>Создать чат</h3>
				{{{ Input }}}
				{{{ Button }}}
			</form>
		`;
    }
}
