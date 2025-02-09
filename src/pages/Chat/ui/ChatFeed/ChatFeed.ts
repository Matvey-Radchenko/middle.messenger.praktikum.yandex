import { Message, MessageBubble } from '@entities/Message';
import { Block, StoreConnector } from '@shared/lib';
import { User } from '@entities/User';
import './ChatFeed.css';

type ChatFeedProps = {
    Messages: Array<MessageBubble>;
};

@StoreConnector<ChatFeedProps>((state) => {
    const user = state.user as User;
    const messages = (state.messages as Array<Message>) || [];

    return {
        Messages: messages?.map((message) => {
            return new MessageBubble({
                ...message,
                outgoing: message.user_id === user?.id,
            });
        }),
    };
})
export class ChatFeed extends Block<ChatFeedProps> {
    constructor() {
        super();
    }

    render() {
        return `
			<main class="chat-feed">
				{{{ Messages }}}
			</main>
		`;
    }
}
