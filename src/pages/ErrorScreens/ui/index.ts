import Handlebars from 'handlebars';

import './ErrorScreen.css';
import { default as ErrorScreen } from './ErrorScreen.hbs?raw';
import { type ErrorScreenProps } from './ErrorScreenProps';

const ErrorScreenTemplate = Handlebars.compile<ErrorScreenProps>(ErrorScreen);

export { ErrorScreenTemplate, ErrorScreenProps };
