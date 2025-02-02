import { isEqual, set } from '@shared/lib/utils';
import { EventBus } from '../eventBus';
import { Block } from '../block';
import { StoreEvents, StoreEventsMap } from './types/StoreEvents';
import { BlockConstructor } from '@shared/lib/block/types/block';

class Store extends EventBus<StoreEventsMap> {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    }
}

const store = new Store();

export function connect(
    Component: BlockConstructor,
    selector: (state: Indexed) => Indexed
) {
    return class extends Component {
        constructor(props: Indexed) {
            let state = selector(store.getState());
            super({ ...props, ...state });

            store.on(StoreEvents.Updated, () => {
                const newState = selector(store.getState());

                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                    state = newState;
                }
            });
        }
    } as BlockConstructor;
}

export default store;
