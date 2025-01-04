import { v4 as uuid } from 'uuid';
import { EventBus } from './eventBus';
import Handlebars from 'handlebars';

export abstract class Block<Props extends Record<string, any> = Record<string, any>> {
    // 1. Статические свойства/методы
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_COMPILE: 'flow:compile',
        FLOW_CDU: 'flow:component-did-update',
    };

    // 2. Приватные свойства
    private eventBus: EventBus;
    private _element: HTMLElement | null = null;
    private _children: Record<string, Array<Block>> = {};
    private _id: string | null = null;

    // 3. Защищённые свойства
    protected props: Props;

    // 4. Конструктор
    constructor(propsWithChildren: Props = {} as Props) {
        const eventBus = new EventBus();
        const { props, children } = this._sortProps(propsWithChildren);
        this._id = uuid();
        this.props = this._makeCDUProxy({ ...props, _id: this._id });
        this._children = this._makeCDUProxy({ ...children });
        this.eventBus = eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    // 5. Геттеры
    get element(): HTMLElement {
        if (!this._element) {
            throw new Error('Элемент ещё не был создан');
        }

        return this._element;
    }

    // 6. Публичные методы
    public setProps(payload: Props) {
        if (!payload) {
            return;
        }

        const { props: newProps, children: newChildren } = this._sortProps(payload);
        // console.log('Block<Props ~ setProps ~ newChildren:', newChildren)
        // console.log('Block<Props ~ setProps ~ newProps:', newProps)

        Object.assign(this.props, newProps);
        Object.assign(this._children, newChildren);
    }

    public dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    public show() {
        if (this.element) {
            this.element.style.display = 'block';
        }
    }

    public hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
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
    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_COMPILE, this._compile.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_COMPILE);
        }
    }

    private _compile() {
        const childrenEntries = Object.entries(this._children);

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

    private _makeCDUProxy<T extends Record<string, any>>(props: T): T {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: T, key: string | symbol, value: any): boolean {
                // console.log('\n\nВ эту цель:', target);
                /* console.log(
                    '\n\nПо такому ключу:',
                    key,
                    '\n\nСтавится это значение:',
                    value
                ); */

                if (typeof key === 'string') {
                    target[key as keyof T] = value;
                    self.eventBus.emit(Block.EVENTS.FLOW_CDU);
                }

                // console.log('\n\nЦель после этого:', target);

                // console.log('\n\nДети после этого:', self._children);

                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    private _sortProps(propsWithChildren: Props) {
        const children: typeof this._children = {};
        const props: typeof this.props = {} as Props;

        Object.entries(propsWithChildren).forEach(([key, value]) => {
            const isChild = value instanceof Block;
            const areChildren = Array.isArray(value) && value[0] instanceof Block;

            if (isChild || areChildren) {
                children[key] = [value].flat();
            } else {
                props[key as keyof Props] = value;
            }
        });

        return { props, children };
    }

    private _addListeners() {
        Object.entries(this.props).forEach(([key, value]) => {
            if (key.startsWith('on') && value instanceof Function) {
                this._element?.addEventListener(key.slice(2).toLowerCase(), value);
            }
        });
    }

    init() {
        this.eventBus.emit(Block.EVENTS.FLOW_COMPILE);
    }
}
