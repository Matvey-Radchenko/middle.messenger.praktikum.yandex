import { Block } from '@shared/lib';
import './MessageBubble.css';
import { Message } from '../model/types/Message';

export class MessageBubble extends Block {
    constructor(props: Message & { outgoing: boolean }) {
        super({
            ...props,
            time: props.time ? new Date(props.time).toLocaleTimeString() : '',
        });
    }

    render() {
        return `
			<div class="
				message 
				{{#if outgoing}}
					message--outgoing
				{{else}}
					message--incoming
				{{/if}}
			">
				<div class="message__content">
					<p class="message__text">
						{{content}}
						<span class="message__time">{{time}}</span>
					</p>
				</div>
			</div>
		`;
    }
}
