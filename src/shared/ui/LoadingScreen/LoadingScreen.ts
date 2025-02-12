import { Block, StoreConnector } from '@shared/lib';
import { LoadingScreenProps } from '@shared/ui/LoadingScreen/LoadingScreenProps';

import './LoadingScreen.css';

@StoreConnector((state) => state.spinner as LoadingScreenProps)
class LoadingScreen extends Block<LoadingScreenProps> {
    constructor() {
        super({
            visible: false,
            caption: '',
        });
    }

    override render() {
        return `
            <div class="loading-screen {{#if visible}}visible{{else}}hidden{{/if}}">
                <div class="loading-screen__content">
                    <div class="
                        loading-screen__animation 
                        loading-screen__animation--rotate
                    ">
                    </div>
                    <div class="loading-screen__caption">
                        {{caption}}
                    </div>
                </div>
            </div>
        `;
    }
}

export { LoadingScreen };
