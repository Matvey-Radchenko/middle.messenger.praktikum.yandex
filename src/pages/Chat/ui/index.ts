import Handlebars from 'handlebars';
import './ChatPage.css';
import { default as ChatPage } from './ChatPage.hbs?raw';
import { ChatPageProps } from '../model/ChatPageProps';

export const ChatPageTemplate = Handlebars.compile<ChatPageProps>(ChatPage);