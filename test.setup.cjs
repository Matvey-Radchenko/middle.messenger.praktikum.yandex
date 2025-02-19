/* eslint-disable @typescript-eslint/no-require-imports */
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
});

Object.assign(global, {
    window: dom.window,
    document: dom.window.document,
    DocumentFragment: window.DocumentFragment,
    Element: window.Element,
    HTMLElement: window.HTMLElement,
    Event: window.Event,
    MouseEvent: window.MouseEvent,
    KeyboardEvent: window.KeyboardEvent,
    Node: window.Node,
});
