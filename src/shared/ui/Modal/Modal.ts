import { Block } from '@shared/lib';
import { ModalProps } from './ModalProps';
import './Modal.css';

export class Modal extends Block {
    constructor(props: ModalProps) {
        super({
            visible: false,
            ...props,
            onclick: (e: Event) => {
                if (props.closable && e.target === this.element) {
                    this.close();
                    props.onclose?.();
                }
            },
        });
    }

    open() {
        this.setProps({ visible: true });
    }

    close() {
        this.setProps({ visible: false });
    }

    render() {
        return `
            <div class='
                modal-backdrop 
                {{class}} 
                {{#if visible}}modal-backdrop--visible{{/if}}
                {{#if darkBackdrop}}modal-backdrop--dark{{/if}}
            '>
                <main class='modal'>
                    {{{ children }}}
                </main>
            </div>
        `;
    }
}
