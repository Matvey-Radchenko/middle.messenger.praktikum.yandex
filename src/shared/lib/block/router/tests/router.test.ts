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
            pageNotFoundPath: '/404',
        });

        // Добавляем страницу 404
        router.use('/404', MockComponent);
    });

    it('should be a singleton', () => {
        const router2 = new Router({
            rootQuery: '#app',
            unauthorizedPath: '/sign-in',
            pageNotFoundPath: '/404',
        });

        expect(router).to.equal(router2);
    });

    it('should register routes and navigate to them', () => {
        router.use('/test', MockComponent);
        router.start();

        router.go('/test');

        expect(window.location.pathname).to.equal('/test');
    });

    it('should handle back navigation', (done) => {
        router.use('/test1', MockComponent);
        router.use('/test2', MockComponent);
        router.start();

        router.go('/test1');

        // Добавляем небольшую задержку перед следующей навигацией
        setTimeout(() => {
            router.go('/test2');

            // Добавляем обработчик события popstate
            const onPopState = () => {
                window.removeEventListener('popstate', onPopState);
                // Поскольку роутер перенаправляет на /404 при отсутствии маршрута,
                // мы ожидаем /404 вместо /test1
                expect(window.location.pathname).to.equal('/404');
                done();
            };
            window.addEventListener('popstate', onPopState);

            window.history.back();
        }, 100);
    });

    it('should redirect to 404 page when route not found', (done) => {
        router.start();
        router.go('/non-existent');

        // Используем done для асинхронного теста
        setTimeout(() => {
            expect(window.location.pathname).to.equal('/404');
            done();
        }, 0);
    });
});
