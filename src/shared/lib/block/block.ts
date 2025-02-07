import { v4 as uuid } from 'uuid';
import { EventBus } from './eventBus';
import Handlebars from 'handlebars';

enum BlockEvents {
    Init = 'init',
    FlowCDM = 'flow:component-did-mount',
    FlowCompile = 'flow:compile',
    FlowCDU = 'flow:component-did-update',
}

type BlockEventsMap<P extends Indexed> = {
    [BlockEvents.Init]: [];
    [BlockEvents.FlowCDM]: [];
    [BlockEvents.FlowCompile]: [];
    [BlockEvents.FlowCDU]: [oldProps: P, newProps: P];
};

export abstract class Block<Props extends Indexed = Indexed> {
    // 1. Статические свойства/методы
    // 2. Приватные свойства
    private eventBus: EventBus<BlockEventsMap<Props>>;

    private _element: HTMLElement | null = null;
    private _id: string | null = null;

    // 3. Защищённые свойства
    protected props: Props;
    protected children: Record<string, Array<Block>> = {};

    // 4. Конструктор
    constructor(propsWithChildren: Props = {} as Props) {
        const eventBus = new EventBus();
        const { props, children } = this._sortProps(propsWithChildren);
        this._id = uuid();
        this.props = this._makeCDUProxy({ ...props, _id: this._id });
        this.children = this._makeCDUProxy({ ...children });
        this.eventBus = eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(BlockEvents.Init);
    }

    // 5. Геттеры
    get element(): HTMLElement {
        if (!this._element) {
            throw new Error('Элемент ещё не был создан');
        }

        return this._element;
    }

    // 6. Публичные методы
    public setProps(payload: Partial<Props>) {
        if (!payload) {
            return;
        }

        const { props: newProps, children: newChildren } = this._sortProps(payload);

        Object.assign(this.props, newProps);
        Object.assign(this.children, newChildren);
    }

    public dispatchComponentDidMount() {
        this.eventBus.emit(BlockEvents.FlowCDM);
    }

    // 7. Публичные методы для переопределения
    protected render(): string {
        return '';
    }

    protected componentDidMount() {}

    protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return true;
    }

    // 8. Приватные методы
    private _registerEvents(eventBus: typeof this.eventBus) {
        eventBus.on(BlockEvents.Init, this.init.bind(this));
        eventBus.on(BlockEvents.FlowCDM, this._componentDidMount.bind(this));
        eventBus.on(BlockEvents.FlowCompile, this._compile.bind(this));
        eventBus.on(BlockEvents.FlowCDU, this._componentDidUpdate.bind(this));
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus.emit(BlockEvents.FlowCompile);
        }
    }

    private _compile() {
        const childrenEntries = Object.entries(this.children);

        const stubs = childrenEntries.reduce(
            (acc, [key, blocks]) => {
                acc[key] = blocks
                    .map((block) => `<div data-id="${block._id}"></div>`)
                    .join('');

                return acc;
            },
            {} as Record<string, string>
        );

        const fragment = document.createElement('template');
        const propsAndStubs = { ...this.props, ...stubs };
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        const newElement = fragment.content.firstElementChild as HTMLElement;

        childrenEntries.forEach(([_, blocks]) => {
            blocks.forEach((child) => {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

                if (stub) {
                    stub.replaceWith(child.element);
                    child.dispatchComponentDidMount();
                }
            });
        });

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addListeners();
    }

    private _makeCDUProxy<T extends Record<string, unknown>>(props: T): T {
        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: T, key: string | symbol, value: unknown): boolean => {
                if (typeof key !== 'string') {
                    return false;
                }

                const oldProps = { ...this.props, ...this.children };

                target[key as keyof T] = value as T[keyof T];

                const newProps = { ...this.props, ...this.children };

                this.eventBus.emit(BlockEvents.FlowCDU, oldProps, newProps);

                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    private _sortProps(propsWithChildren: Partial<Props>) {
        const children: typeof this.children = {};
        const props: typeof this.props = {} as Props;

        Object.entries(propsWithChildren).forEach(([key, value]) => {
            const isChild = value instanceof Block;
            const areChildren = Array.isArray(value) && value[0] instanceof Block;

            if (isChild || areChildren) {
                children[key] = [value].flat();
            } else {
                (props as Indexed)[key] = value;
            }
        });

        return { props, children };
    }

    private _addListeners() {
        Object.entries(this.props).forEach(([key, value]) => {
            if (key.startsWith('on') && value instanceof Function) {
                const event = key.slice(2).toLowerCase() as keyof HTMLElementEventMap;
                this._element?.addEventListener(event, value as EventListener);
            }
        });
    }

    init() {
        this.eventBus.emit(BlockEvents.FlowCompile);
    }
}
