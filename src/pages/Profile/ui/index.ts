import Handlebars from 'handlebars';
import './ProfilePage.css';
import { default as ProfilePage } from './ProfilePgae.hbs?raw';
import { ProfilePageProps } from '../model/types/ProfilePageProps';

export const ProfilePageTemplate = Handlebars.compile<ProfilePageProps>(ProfilePage);
