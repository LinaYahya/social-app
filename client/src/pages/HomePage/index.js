import React, { useState } from 'react';

import RoomsList from '../../components/Rooms';
import FriendsList from '../../components/FriendsList';
import PersonalHeader from '../../components/Header';
import './style.css';

export default function HomePage() {
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div>
      {showFriends ? (
        <FriendsList showFriends={showFriends} setShowFriends={setShowFriends} />
      )
        : (
          <div className="roomlist">
            <PersonalHeader setShowFriends={setShowFriends} />
            <RoomsList />
          </div>
        )}
    </div>
  );
}
