import { expect } from 'chai';
import { Router } from '../Router';
import { Block } from '../../block';
import Store from '../../store/store';

// Создаем мок-компонент для тестов
class MockComponent extends Block {
    protected render(): string {
        return '<div></div>';
    }
}

describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router({
            rootQuery: '#app',
            unauthorizedPath: '/sign-in',
            pageNotFoundPath: '/404',
        });

        router.use('/404', MockComponent);

        router.go('/');
    });

    afterEach(() => {
        Router.reset();
        document.body.innerHTML = '';
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

        expect(router.currentPath).to.equal('/test');
    });

    it('should handle back navigation', function (done) {
        router.use('/test1', MockComponent).use('/test2', MockComponent).start();

        router.go('/test1');
        router.go('/test2');
        router.back();

        setTimeout(() => {
            expect(router.currentPath).to.equal('/test1');
            done();
        }, 100);
    });

    it('should handle forward navigation', function (done) {
        router.use('/test1', MockComponent).use('/test2', MockComponent).start();

        router.go('/test1');
        router.go('/test2');
        router.back();

        setTimeout(() => {
            expect(router.currentPath).to.equal('/test1');
            router.forward();

            setTimeout(() => {
                expect(router.currentPath).to.equal('/test2');
                done();
            }, 100);
        }, 100);
    });

    it('should redirect to sign-in when accessing protected route without auth', function (done) {
        Store.set('isAuth', false);

        router
            .use('/', MockComponent)
            .use('/sign-in', MockComponent)
            .use('/protected', MockComponent, { requiredAuth: true })
            .start();

        router.go('/protected');

        setTimeout(() => {
            expect(router.currentPath).to.equal('/sign-in');
            done();
        }, 100);
    });

    it('should allow access to protected route when authenticated', function (done) {
        Store.set('isAuth', true);

        router
            .use('/', MockComponent)
            .use('/protected', MockComponent, { requiredAuth: true })
            .start();

        router.go('/protected');

        setTimeout(() => {
            expect(router.currentPath).to.equal('/protected');
            done();
        }, 100);
    });

    it('should redirect from auth-only routes when logged in', function (done) {
        Store.set('isAuth', true);

        router
            .use('/', MockComponent)
            .use('/sign-in', MockComponent, { prohibitedWhenLoggedIn: true })
            .start();

        router.go('/sign-in');

        setTimeout(() => {
            // Должен редиректить на главную страницу, если пользователь авторизован
            expect(router.currentPath).to.equal('/');
            done();
        }, 100);
    });

    it('should allow access to auth-only routes when not logged in', function (done) {
        Store.set('isAuth', false);

        router
            .use('/', MockComponent)
            .use('/sign-in', MockComponent, { prohibitedWhenLoggedIn: true })
            .start();

        router.go('/sign-in');

        setTimeout(() => {
            expect(router.currentPath).to.equal('/sign-in');
            done();
        }, 100);
    });

    it('should redirect to 404 page when route not found', (done) => {
        router.start();
        router.go('/non-existent');

        setTimeout(() => {
            expect(router.currentPath).to.equal('/404');
            done();
        }, 100);
    });
});
