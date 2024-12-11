import Handlebars from 'handlebars';
import { TextInput, Button, Link, Avatar } from '@shared';
import { ChatPreview, MessageTemplate } from '@entities';
import { AttributeRow } from '@shared/ui';

Handlebars.registerPartial('TextInput', TextInput);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('AttributeRow', AttributeRow);

Handlebars.registerPartial('Message', MessageTemplate);
Handlebars.registerPartial('ChatPreview', ChatPreview);
