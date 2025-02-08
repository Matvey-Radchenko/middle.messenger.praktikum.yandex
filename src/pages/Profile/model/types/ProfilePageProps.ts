import { User } from '@entities';
import { AttributeRow, Avatar, Button, Link, Modal, TextInput } from '@shared/ui';

export type ProfilePageProps = {
    onsubmit: (e: SubmitEvent) => void;
    editMode: boolean;
    BackLink: Link;
    UserAttributes: AttributeRow[];
    UserAvatar: Avatar;
    FileModal: Modal;
    ReadModeActions: Button[];
    EditModeActions: Button[];
    Inputs?: TextInput[];
} & User;
