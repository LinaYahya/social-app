/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-template */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../slices/roomsSlice';
import './style.css';

function Rooms({ setChatID }) {
  const { rooms } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, []);
  return (
    <div className="conversations">
      {rooms?.map(({ _id, name, avatar }) => (
        <div className="room" role="button" tabIndex={0} key={_id} onClick={() => setChatID(_id)}>
          <img src={'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_50,r_500,w_50/v1605737001/' + avatar} alt={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

Rooms.propTypes = {
  setChatID: PropTypes.func.isRequired,
};

export default Rooms;
