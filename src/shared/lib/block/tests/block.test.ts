import { expect } from 'chai';
import sinon from 'sinon';
import { Block } from '../block';

// Создаем тестовый компонент
class TestBlock extends Block {
    constructor(props = {}) {
        super(props);
    }

    protected render(): string {
        return `
            <div class="test-block">
                {{text}}
                {{#if child}}
                    {{{child}}}
                {{/if}}
                {{#if children}}
                    {{{children}}}
                {{/if}}
            </div>
        `;
    }

    // Метод для тестирования
    public getProps() {
        return this.props;
    }
}

describe('Block', () => {
    let testBlock: TestBlock;

    beforeEach(() => {
        testBlock = new TestBlock({ text: 'Test' });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create an instance with props', () => {
        const props = testBlock.getProps();
        expect(props).to.have.property('text', 'Test');
        expect(props).to.have.property('_id').that.is.a('string');
    });

    it('should render template with props', () => {
        expect(testBlock.element.outerHTML).to.include('Test');
        expect(testBlock.element.className).to.equal('test-block');
    });

    it('should update props and re-render', () => {
        testBlock.setProps({ text: 'Updated' });
        expect(testBlock.element.textContent?.trim()).to.equal('Updated');
    });

    it('should handle event listeners', () => {
        const spy = sinon.spy();
        const block = new TestBlock({
            text: 'Click me',
            onclick: spy,
        });

        block.element.click();
        expect(spy.calledOnce).to.equal(true);
    });

    it('should handle nested components', () => {
        const childBlock = new TestBlock({ text: 'Child' });
        const parentBlock = new TestBlock({
            text: 'Parent',
            child: [childBlock],
        });

        expect(parentBlock.element.textContent?.trim()).to.include('Child');
        expect(parentBlock.element.textContent?.trim()).to.include('Parent');
    });

    it('should call componentDidMount when mounted', () => {
        const block = new TestBlock();
        const spy = sinon.spy(block as any, 'componentDidMount');
        block.dispatchComponentDidMount();
        expect(spy.calledOnce).to.equal(true);
    });

    it('should call componentDidUpdate when props change', () => {
        const spy = sinon.spy(testBlock as any, 'componentDidUpdate');
        testBlock.setProps({ text: 'New text' });
        expect(spy.calledOnce).to.equal(true);
    });

    it('should handle multiple children of the same type', () => {
        const children = [
            new TestBlock({ text: 'Child 1' }),
            new TestBlock({ text: 'Child 2' }),
        ];
        const parentBlock = new TestBlock({
            text: 'Parent',
            children: children,
        });

        const content = parentBlock.element.textContent?.trim();
        expect(content).to.include('Child 1');
        expect(content).to.include('Child 2');
        expect(content).to.include('Parent');
    });

    it('should prevent direct property deletion', () => {
        const props = testBlock.getProps();
        expect(() => {
            delete (props as any).text;
        }).to.throw('Отказано в доступе');
    });

    it('should maintain event listeners after re-render', () => {
        const spy = sinon.spy();
        const block = new TestBlock({
            text: 'Click me',
            onclick: spy,
        });

        block.setProps({ text: 'Updated text' });
        block.element.click();
        expect(spy.calledOnce).to.equal(true);
    });
});
