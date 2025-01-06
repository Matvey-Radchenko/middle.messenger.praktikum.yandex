import { Block } from '@shared/lib';
import { ButtonProps } from './ButtonProps';

export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return `
			<{{#if link}}a{{else}}button{{/if}}
				id='{{id}}'
				type={{#if type}}'{{type}}'{{else}}'button'{{/if}}
				class='
					button 
					{{class}} 
					{{#if size}}button__size--{{size}}{{/if}} 
					{{#if link}}link{{/if}}
					{{#if round}}round{{/if}}
				'
				{{#if disabled}}
					disabled
				{{/if}}
				{{#if link}}href='{{link}}'{{/if}}
			>
				{{{text}}}
			</{{#if link}}a{{else}}button{{/if}}>
		`;
    }
}
