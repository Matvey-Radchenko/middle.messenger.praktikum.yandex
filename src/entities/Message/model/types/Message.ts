export type Message = {
    chat_id: number;
    content: string;
    file: null;
    id: number;
    is_read: boolean;
    /** ISO */
    time: string;
    type: 'message';
    user_id: number;
};
