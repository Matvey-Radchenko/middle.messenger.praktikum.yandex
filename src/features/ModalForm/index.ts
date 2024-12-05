import Handlebars from 'handlebars';

import './ModalForm.css';
import { default as ModalFormTemplate } from './ModalForm.hbs?raw';
import { type ModalFormProps } from './ModalFormProps';

const ModalForm = Handlebars.compile<ModalFormProps>(ModalFormTemplate);

export { ModalForm, ModalFormProps };
