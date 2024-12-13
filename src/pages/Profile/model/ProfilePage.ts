import { User } from '@entities';
import { ProfilePageTemplate } from '../ui';
import { Page } from '@shared';

export class ProfilePage implements Page {
    user?: User;
    mode: 'view' | 'edit-user' | 'edit-password' = 'view';

    setUser?: (user: User) => void;
    logOut?: () => void;

    setMode(mode: typeof this.mode) {
        this.mode = mode;
        document.getElementById('app')!.innerHTML = this.render();
        this.attachListeners();
    }

    attachListeners(): void {
        document.addEventListener('input', (event) => {
            const input = event.target as HTMLInputElement;
            const name = input.name as keyof User;
            this.user![name] = input.value;
        });

        document.getElementById('edit-user')?.addEventListener('click', () => {
            this.setMode('edit-user');
        });

        document.getElementById('edit-password')?.addEventListener('click', () => {
            this.setMode('edit-password');
        });

        document.getElementById('logout')?.addEventListener('click', () => {
            this.logOut?.();
        });

        document.getElementById('edit-user-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.setUser?.(this.user!);
        });

        document.getElementById('edit-password-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.setUser?.(this.user!);
        });
    }

    constructor(user: User, setUser: typeof this.setUser, logOut: typeof this.logOut) {
        this.user = user;
        this.setUser = setUser;
        this.logOut = logOut;
    }

    render(): string {
        if (!this.user) {
            return '';
        }

        return ProfilePageTemplate({
            ...this.user,
            editUser: this.mode == 'edit-user',
            editPassword: this.mode == 'edit-password',
        });
    }
}
