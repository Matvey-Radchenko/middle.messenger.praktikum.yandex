import { MessageProps } from '@entities';
import { AvatarProps } from '@shared/ui';

export type ChatPreviewProps = {
    name: string;
    avatar: Omit<AvatarProps, 'size'>;
    lastMessage: MessageProps;
    unreadMessages?: number;
};
