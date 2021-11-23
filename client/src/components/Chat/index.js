/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import whatApp from '../../assets/favicon.ico';

const MsgBlock = ({ msg }) => {
  const { msg: msgText, created_at: date, userID: { name } } = msg;
  return (
    <div className={name === 'lina' ? 'msgBox msgYou' : 'msgBox'}>
      {name !== 'lina' && (
        <>
          <span className="msgUser">{name}</span>
          <br />
        </>
      ) }
      <span>{msgText}</span>
      <br />
      <time>{new Date(date).toLocaleString()}</time>
    </div>
  );
};

function Chat({ chatID }) {
  const [msgInput, setMsgInput] = useState('');
  const [msg, setMsg] = useState('');
  const [prevMsgs, setPrevMsgs] = useState([]);

  const { rooms } = useSelector((state) => state.rooms);
  const room = rooms.find((ele) => ele._id === chatID);

  const socket = io({ autoConnect: false });
  useEffect(() => {
    if (msg) {
      socket.open();
      socket.emit('msg', { msg, roomID: chatID });
    }
  }, [msg]);

  useEffect(() => {
    socket.on('msg', (data) => {
      setPrevMsgs((pre) => [data, ...pre]);
    });
  });
  useEffect(() => {
    socket.open();
    socket.emit('room', chatID);
    socket.on('room', (messages) => {
      setPrevMsgs(messages);
    });
  }, [chatID]);

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
              {prevMsgs?.reverse().map((Msg) => (
                <>
                  <MsgBlock msg={Msg} key={Msg._id} />
                  <br />
                </>
              ))}

            </div>
          </div>
          <div className="inputMsg_container">
            <input placeholder="Type a message" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} />
            <button
              type="button"
              onClick={() => {
                setMsg(msgInput);
                setMsgInput('');
              }}
            >
              send
            </button>
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

MsgBlock.propTypes = {
  msg: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    userID: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
Chat.propTypes = {
  chatID: PropTypes.string.isRequired,
};

export default Chat;
