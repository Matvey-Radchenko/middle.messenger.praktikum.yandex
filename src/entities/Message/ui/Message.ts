import { MessageProps } from '../model/MessageProps';
import { Block } from '@shared/lib';
import './Message.css';

export class Message extends Block {
    constructor(props: MessageProps) {
        super(props);
    }

    render() {
        return `
			<div class="message {{#if outgoing}}message--outgoing{{else}}message--incoming{{/if}}">
				<div class="message__content">
				<p class="message__text">
					{{text}}
					<span class="message__time">{{time}}</span>
				</p>
				{{#if image}}
					<img class="message__image" src="{{image}}" alt="Image">
				{{/if}}
				</div>
			</div>
		`;
    }
}
