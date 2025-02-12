/* eslint-disable @typescript-eslint/no-explicit-any */
// Этого требует typescript для конструирования классов mixin'ов в декораторах

import { isEqual, set } from '@shared/lib/utils';
import { EventBus } from '../eventBus';
import { StoreEvents, StoreEventsMap } from './types/StoreEvents';
import { BlockConstructor } from '@shared/lib/block/types/block';

class Store extends EventBus<StoreEventsMap> {
    private state: Indexed = {};

    public getState<T = unknown>(route?: string): T {
        return (route ? this.state[route] : this.state) as T;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    }
}

const storeInstance = new Store();

export function StoreConnector<P extends Indexed>(
    selector: (state: Indexed) => Partial<P>
) {
    return function <C extends BlockConstructor<P>>(Component: C): C {
        const DecoratedClass = class extends Component {
            constructor(...args: any[]) {
                const props = (args[0] || {}) as P;

                let stateSlice = selector(storeInstance.getState());

                super({ ...props, ...stateSlice });

                storeInstance.on(StoreEvents.Updated, () => {
                    const newStateSlice = selector(storeInstance.getState());

                    if (!isEqual(stateSlice, newStateSlice)) {
                        this.setProps({ ...newStateSlice });
                        stateSlice = newStateSlice;
                    }
                });
            }
        };

        return DecoratedClass as unknown as C;
    };
}

export default storeInstance;
