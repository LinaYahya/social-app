import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const chats = [
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  }, {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
  {
    name: 'hi',
    avatar:
      'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_70,r_500,w_70/v1605737001/qyrth98fqt0l4pwjfa50.jpg',
  },
];

function Rooms() {
  return (
    <div className="roomlist">
      {chats?.map((chat, index) => (
        <div className="room" key={index}>
          <img src={chat.avatar} alt="" />
          <span>{chat.name}</span>
        </div>
      ))}
    </div>
  );
}

Rooms.propTypes = {

};

export default Rooms;
