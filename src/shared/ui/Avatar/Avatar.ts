import { AvatarProps } from './AvatarProps';
import { Block } from '@shared/lib';
import './Avatar.css';

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props);
    }

    render() {
        return `
			<div class='avatar avatar--{{size}}'>
				{{#if src}}
					<img src='{{src}}' alt='Avatar' class='avatar__image' />
				{{else}}
					<span class='avatar__initials'>{{initials}}</span>
				{{/if}}
			</div>
		`;
    }
}
