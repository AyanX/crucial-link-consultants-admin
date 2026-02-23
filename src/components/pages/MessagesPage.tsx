import React from 'react';
import { MessagesProvider } from '../../context/MessagesContext';
import MessageList from '../messages/MessageList/MessageList';
import MessageDetail from '../messages/MessageDetail/MessageDetail';
import './MessagesPage.scss';

const MessagesPage: React.FC = () => (
  <MessagesProvider>
    <div className="messages-page">
      <MessageList />
      <MessageDetail />
    </div>
  </MessagesProvider>
);

export default MessagesPage;
