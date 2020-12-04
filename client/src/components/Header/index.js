import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function PersonalHeader() {
  const [show, setShow] = useState(false);
  return (
    <div className="roomHeader">
      <img
        src="https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_50,r_500,w_50/v1605737001/npm04fbyn5cdsarivhi9.jpg"
        alt="avatar"
      />
      <div>
        <button type="button" className="settingBtn" onMouseEnter={() => setShow(true)}>
          <FontAwesomeIcon icon={faEllipsisV} size="1x" color="gray" />
        </button>

        {show && (
          <div className="settingMenu" onMouseLeave={() => setShow(false)}>
            <ul>
              <li>New group</li>
              <li>New Broadcast</li>
              <li>WhatsApp Webb</li>
              <li>Starred messages</li>
              <li>Settings</li>
            </ul>
          </div>
        )}
      </div>
    </div>

  );
}
