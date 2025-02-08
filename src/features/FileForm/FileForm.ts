import { Block, HTTPResponse } from '@shared/lib';
import { Button } from '@shared/ui';
import './FileForm.css';

type TFileFormProps = {
    accept: string;
    onsubmit: (file: File) => Promise<HTTPResponse>;
};

export class FileForm extends Block {
    private _fileInput: HTMLInputElement;

    constructor({ accept, onsubmit }: TFileFormProps) {
        super({
            uploadError: false,
            noFileError: false,
            SelectFileButton: new Button({
                text: 'Выбрать файл на компьютере',
                class: 'link',
                link: true,
                onclick: () => this._fileInput.click(),
            }),
            SubmitButton: new Button({
                text: 'Загрузить',
                class: 'primary',
                type: 'submit',
            }),
            onsubmit: (e: SubmitEvent) => {
                e.preventDefault();
                e.stopPropagation();

                const file = this._fileInput.files?.[0];

                if (!file) {
                    this.setProps({ noFileError: true });
                    return;
                }

                onsubmit(file)
                    .then(() => {
                        this.reset();
                    })
                    .catch(() => {
                        this.setProps({ uploadError: true });
                    });
            },
        });

        this._fileInput = document.createElement('input');
        this._fileInput.type = 'file';
        this._fileInput.accept = accept;
        this._fileInput.onchange = () => {
            const file = this._fileInput.files?.[0];
            this.setProps({ fileName: file?.name, noFileError: !file });
        };
    }

    reset() {
        this._fileInput.value = '';
        this.setProps({ fileName: null, uploadError: false, noFileError: false });
    }

    render() {
        return `
            <form class="file-form">
                <h2 class="
                    file-form__title 
                    {{#if uploadError}} file-form__title_error{{/if}}
                ">
                    {{#if uploadError}}
                        Ошибка, попробуйте ещё раз
                    {{else}}
                        Загрузите файл
                    {{/if}}
                </h2>
                <div class="file-form__body">
                    {{#if fileName}}
                        <span class="file-form__filename">{{fileName}}</span>
                    {{else}}
                        {{{ SelectFileButton }}}
                    {{/if}}
                    </div>
                <div class="file-form__footer">
                    {{{ SubmitButton }}}
                    {{#if noFileError}}
                        <span class="file-form__error">Нужно выбрать файл</span>
                    {{/if}}
                </div>
            </form>
        `;
    }
}
