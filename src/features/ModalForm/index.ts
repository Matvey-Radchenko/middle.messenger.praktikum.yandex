import Handlebars from 'handlebars';

import './ModalForm.css';
import { default as ModalForm } from './ModalForm.hbs?raw';
import { type ModalFormProps } from './ModalFormProps';

const ModalFormTemplate = Handlebars.compile<ModalFormProps>(ModalForm);

export { ModalFormTemplate, ModalFormProps };
