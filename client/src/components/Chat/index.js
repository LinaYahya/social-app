/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import whatApp from '../../assets/favicon.ico';

const msgs = [
  { text: 'hi omar', date: '12:25 pm', user: 'lina' },
  { text: 'hi lina', date: '12:25 pm', user: 'amar' },
  { text: 'how are you doing?', date: '12:25 pm', user: 'lina' },
  { text: 'fine', date: '12:25 pm', user: 'omar' },
  { text: 'What about you', date: '12:25 pm', user: 'omar' },

];
const MsgBlock = (msg) => {
  const { text, date, user } = msg.msg;
  // const userID = 'lina';
  return (
    <div className={user === 'lina' ? 'msgBox msgYou' : 'msgBox'}>
      {user !== 'lina' && (
        <>
          <span className="msgUser">{user}</span>
          <br />
        </>
      ) }
      <span>{text}</span>
      <br />
      <time>{date}</time>
    </div>
  );
};

function Chat({ chatID }) {
  const { rooms } = useSelector((state) => state.rooms);
  const room = rooms.find((ele) => ele._id === chatID);

  return (
    <div className="chat">
      {chatID ? (
        <div>
          <header className="roomHeader">
            <div>
              <img src={'https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_50,r_500,w_50/v1605737001/' + room.avatar} alt={room.name} />
              <span>{room.name}</span>
            </div>
          </header>
          <div className="chatBox">
            <div>
              {msgs?.map((msg) => (
                <>
                  <MsgBlock msg={msg} />
                  <br />
                </>
              ))}

            </div>
          </div>

        </div>
      ) : (
        <div className="containerChat">
          <img src={whatApp} alt="whatApp icon" />
          <h3>
            Powered BY
            <span style={{ color: '#07bc4c' }}> facebook</span>
          </h3>
        </div>
      )}
    </div>
  );
}

Chat.propTypes = {
  chatID: PropTypes.string.isRequired,
};

export default Chat;
