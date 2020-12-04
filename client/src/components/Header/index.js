import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function PersonalHeader() {
  return (
    <div className="roomHeader">
      <img
        src="https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_50,r_500,w_50/v1605737001/npm04fbyn5cdsarivhi9.jpg"
        alt="avatar"
      />
      <button type="button" className="setting">
        <FontAwesomeIcon icon={faEllipsisV} size="1x" color="gray" />
      </button>
    </div>

  );
}
