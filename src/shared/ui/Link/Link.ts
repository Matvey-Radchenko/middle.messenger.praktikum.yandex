import { Block } from '@shared/lib';
import { LinkProps } from './LinkProps';

export class Link extends Block {
    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return `
			<a
				href='{{href}}'
				class='link {{type}}'
				data-link
				{{#if disabled}}disabled{{/if}}
			>
				{{text}}
			</a>
		`;
    }
}
