import { Block } from '@shared/lib';
import { AttributeRowProps } from '@shared/ui/AttributeRow/AttributeRowProps';
import './AttributeRow.css';

export class AttributeRow extends Block {
    constructor(props: AttributeRowProps) {
        super(props);
    }

    render() {
        return `
			<div class='attribute-row'>
				<span class='attribute-row__name'>{{name}}:</span>
				<span class='attribute-row__value'>{{value}}</span>
			</div>
		`;
    }
}
