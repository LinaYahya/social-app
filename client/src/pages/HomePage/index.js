import React, { useState } from 'react';

import RoomsList from '../../components/Rooms';
import FriendsList from '../../components/FriendsList';
import PersonalHeader from '../../components/Header';
import Chat from '../../components/Chat';
import './style.css';

export default function HomePage() {
  const [showFriends, setShowFriends] = useState(false);
  const [chatID, setChatID] = useState(null);

  return (
    <div className="homePage">
      {showFriends ? (
        <FriendsList showFriends={showFriends} setShowFriends={setShowFriends} />
      )
        : (
          <div className="roomlist">
            <PersonalHeader setShowFriends={setShowFriends} />
            <RoomsList setChatID={setChatID} />
          </div>
        )}
      <Chat chatID={chatID} />
    </div>
  );
}
