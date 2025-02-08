import { Block, Store, StoreConnector } from '@shared/lib';
import { Avatar } from '@shared/ui/Avatar/Avatar';
import { User } from '@entities/User';
import { getResoursePath } from '@entities/Resourse';
import { getInitials } from '@pages/Profile/model/getInitials';
import './ProfileAvatar.css';

type ProfileAvatarProps = {
    onclick?: (e: MouseEvent) => void;
    Avatar?: Avatar;
};

const avatarSelector = (state: Indexed) => {
    const user = state.user as User;

    return {
        Avatar: new Avatar({
            src: getResoursePath(user.avatar),
            initials: getInitials(user),
            size: 'xlarge',
        }),
    };
};

@StoreConnector<ProfileAvatarProps>(avatarSelector)
export class ProfileAvatar extends Block<ProfileAvatarProps> {
    constructor(props: ProfileAvatarProps) {
        const storeSlice = avatarSelector(Store.getState());

        super({ ...props, ...storeSlice });
    }

    render() {
        return `
            <div class="profile-avatar">
                {{{ Avatar }}}
                <div class="profile-avatar__overlay">Поменять аватар</div>
            </div>
        `;
    }
}
