import { User, USER_PROP_NAMES, UserProfile } from '@entities/User';
import { USER_ATTRS_ORDER } from '@pages/Profile/model/userAttrsOrder';
import { AttributeRow } from '@shared/ui';

export const userSelector = (state: Indexed) => {
    const user = state.user as User;

    const profileProps = Object.entries(user || {}).filter(
        ([key]) => key in USER_ATTRS_ORDER
    ) as Array<[keyof UserProfile, string]>;

    return {
        ...user,
        UserAttributes: profileProps
            .sort(([keyA], [keyB]) => USER_ATTRS_ORDER[keyA] - USER_ATTRS_ORDER[keyB])
            .map(([key, value]) => {
                const name = (USER_PROP_NAMES as Indexed<string>)[key];

                if (!name) {
                    return null;
                }

                return new AttributeRow({ name, value });
            }) as AttributeRow[],
    };
};
