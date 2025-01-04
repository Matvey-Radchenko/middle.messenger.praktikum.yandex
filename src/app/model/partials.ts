import Handlebars from 'handlebars';
import { ChatPreview } from '@entities';
import { AttributeRow } from '@shared/ui';

// Handlebars.registerPartial('TextInput', TextInput);
// Handlebars.registerPartial('Button', Button);
// Handlebars.registerPartial('Link', Link);
// Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('AttributeRow', AttributeRow);

// Handlebars.registerPartial('Message', Message);
Handlebars.registerPartial('ChatPreview', ChatPreview);
