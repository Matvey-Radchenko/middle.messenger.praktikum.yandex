import { Block } from '@shared/lib';
import { ModalProps } from './ModalProps';
import './Modal.css';

export class Modal extends Block {
    constructor(props: ModalProps) {
        super(props);
    }

    render() {
        return `
            <div class='modal-backdrop {{#if darkBackdrop}}modal-backdrop--dark{{/if}}'>
                <main class='modal'>
                    {{{children}}}
                </main>
            </div>
        `;
    }
}
