import { EventBus } from './eventBus';
import { BlockEvents, BlockMeta } from './types/block';

export class Block<Props extends Record<string, unknown> = Record<string, unknown>> {
    static EVENTS: BlockEvents = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    private _element: HTMLElement | null = null;
    private _meta: BlockMeta | null = null;
    protected props: Props;
    private eventBus: EventBus;

    constructor(tagName: string = 'div', props: Props = {} as Props) {
        const eventBus = new EventBus();
        this._meta = { tagName, props };
        this.props = this._makePropsProxy(props);
        this.eventBus = eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources(): void {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    init(): void {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    protected componentDidMount(): void {}

    dispatchComponentDidMount(): void {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return true;
    }

    setProps(nextProps: Partial<Props>): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        if (this._element) {
            this._element.innerHTML = block;
        }
    }

    protected render(): string {
        return '';
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    private _makePropsProxy(props: Props): Props {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Props, prop: string | symbol, value: any): boolean {
                if (typeof prop === 'string') {
                    target[prop as keyof Props] = value;
                    self.eventBus.emit(Block.EVENTS.FLOW_CDU);
                }

                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    show(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    hide(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
