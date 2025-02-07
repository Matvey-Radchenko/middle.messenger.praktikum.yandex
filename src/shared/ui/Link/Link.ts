import { Block, Router } from '@shared/lib';
import { LinkProps } from './LinkProps';

export class Link extends Block {
    constructor(props: LinkProps) {
        super({
            ...props,
            onclick: () => Router.instance.go(props.href),
        });
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
