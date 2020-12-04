import React from 'react';
import RoomsList from '../../components/Rooms';
import PersonalHeader from '../../components/Header';
import './style.css';

export default function HomePage() {
  return (
    <div>
      <div className="roomlist">
        <PersonalHeader />
        <RoomsList />
      </div>

    </div>
  );
}
