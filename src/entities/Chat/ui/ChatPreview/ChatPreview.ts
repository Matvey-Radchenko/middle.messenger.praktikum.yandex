import { ChatPreviewProps } from '../../model/ChatPreviewProps';
import { Block, Router } from '@shared/lib';
import { Avatar } from '@shared/ui';
import './ChatPreview.css';

export class ChatPreview extends Block {
    constructor(props: ChatPreviewProps) {
        super({
            ...props,
            Avatar: new Avatar({
                src: props.avatar,
                initials: props.title.slice(0, 2),
                size: 'medium',
            }),
            onclick: () => {
                Router.instance.go(`/messenger/${props.id}`);
            },
        });
    }

    render() {
        return `
			<div class="chat-preview">
				<div class="chat-preview__avatar">
					{{{ Avatar }}}
				</div>
				<div class="chat-preview__content">
					<div class="chat-preview__header">
					<span class="chat-name">{{title}}</span>
					<span class="last-message-time">{{last_message.time}}</span>
					</div>
					<div class="chat-preview__message-body">
						{{#if last_message.outgoing}}
							<span class="chat-preview__own">Вы:</span>
						{{/if}}
						<span class="message-text">
							{{last_message.content}}
						</span>
						{{#if unread_count}}
							<span class="unread-messages-badge">
								{{unread_count}}
							</span>
						{{/if}}
					</div>
				</div>
			</div>
		`;
    }
}
