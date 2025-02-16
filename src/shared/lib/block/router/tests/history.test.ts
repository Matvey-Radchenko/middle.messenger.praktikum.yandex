/// <reference path="../../../../types/global.d.ts" />

import { expect } from 'chai';
import { Router } from '../Router';
import { Block } from '../../block';

// Создаем мок-компонент для тестов
class MockComponent extends Block {
    protected render(): string {
        return '<div></div>';
    }
}

describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        // Сбрасываем синглтон перед каждым тестом
        (Router as any).__instance = undefined;
        
        router = new Router({
            rootQuery: '#app',
            unauthorizedPath: '/sign-in',
            pageNotFoundPath: '/404'
        });

        // Добавляем страницу 404
        router.use('/404', MockComponent);
    });

    it('should be a singleton', () => {
        const router2 = new Router({
            rootQuery: '#app',
            unauthorizedPath: '/sign-in',
            pageNotFoundPath: '/404'
        });

        expect(router).to.equal(router2);
    });

    it('should add route correctly', () => {
        router.use('/test', MockComponent);
        expect(router.routes).to.have.lengthOf(2); // 2 because we already have /404 route
        expect(router.routes[1].pathname.full).to.equal('/test');
    });

    it('should handle history navigation', () => {
        router.use('/test', MockComponent);
        router.start();

        router.go('/test');

        expect(window.location.pathname).to.equal('/test');
    });
});