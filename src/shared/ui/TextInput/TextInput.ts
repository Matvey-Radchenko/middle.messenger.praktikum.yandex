import { Block } from '@shared/lib';
import { TextInputProps } from './TextInputProps';

export class TextInput extends Block {
    constructor(props: TextInputProps) {
        super(props);
    }

    render() {
        return `
			<input
				id='{{name}}'
				type='{{type}}'
				name='{{name}}'
				value='{{value}}'
				placeholder='{{placeholder}}'
				class='text-input {{view}}'
			/>
		`;
    }
}
