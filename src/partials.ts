import Handlebars from 'handlebars';
import { TextInput, Button, Link, Avatar } from '@shared/index';
import { ChatPreview, MessageTemplate } from '@entities/index';

Handlebars.registerPartial('TextInput', TextInput);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Avatar', Avatar);

Handlebars.registerPartial('Message', MessageTemplate);
Handlebars.registerPartial('ChatPreview', ChatPreview);
