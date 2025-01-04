import { Block } from '@shared/lib';
import { TextInputProps } from './TextInputProps';

export class TextInput extends Block {
    regExp?: RegExp;

    constructor(props: TextInputProps) {
        Object.assign(props, {
            isValid: true,
            errorText: props.validation?.errorText || '',
            onfocusout: () => this.validate(),
        });

        super(props);

        if (props.validation) {
            this.regExp = props.validation.regExp;
        }
    }

    validate() {
        if (!this.regExp) {
            return;
        }

        const value = (this.element.firstElementChild as HTMLInputElement).value.trim();
        const isValid = this.regExp.test(value);

        this.setProps({ value, isValid });

        return isValid;
    }

    render() {
        return `
			<div class='text-input-wrapper'>
				<input
					id='{{name}}'
					type='{{type}}'
					name='{{name}}'
					value='{{value}}'
					placeholder='{{placeholder}}'
					class='text-input {{view}} {{#unless isValid}}invalid{{/unless}}'
				/>
				{{#unless isValid}}
					<span class='error-text'>{{errorText}}</span>
				{{/unless}}
			</div>
		`;
    }
}
