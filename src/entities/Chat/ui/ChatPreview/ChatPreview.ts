import { ChatPreviewProps } from '../../model/ChatPreviewProps';
import { Block } from '@shared/lib';
import './ChatPreview.css';
import { Avatar } from '@shared/ui';

export class ChatPreview extends Block {
    constructor(props: ChatPreviewProps) {
        super({ ...props, avatar: new Avatar({ ...props.avatar, size: 'medium' }) });
    }

    render() {
        return `
			<div class="chat-preview">
				<div class="chat-preview__avatar">
					{{{ avatar }}}
				</div>
				<div class="chat-preview__content">
					<div class="chat-preview__header">
					<span class="chat-name">{{name}}</span>
					<span class="last-message-time">{{lastMessage.time}}</span>
					</div>
					<div class="chat-preview__message-body">
						{{#if isOwnMessage}}
							<span class="chat-preview__own">Вы:</span>
						{{/if}}
						<span class="message-text">
							{{lastMessage.text}}
						</span>
						{{#if unreadMessages}}
							<span class="unread-messages-badge">
								{{unreadMessages}}
							</span>
						{{/if}}
					</div>
				</div>
			</div>
		`;
    }
}
