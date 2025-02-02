import { Block } from '@shared/lib';
import { ErrorScreenProps } from '../model/types/ErrorScreenProps';
import './ErrorScreen.css';

export class ErrorScreen extends Block {
    constructor(props: ErrorScreenProps) {
        super(props);
    }

    render() {
        return `
			<div class='error-screen'>
				<main class='error-screen__content'>
					<h1>{{code}}</h1>
					<h4>{{message}}</h4>
					{{{ link }}}
				</main>
			</div>
		`;
    }
}
