import React, { useState } from "react";

const EventForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div>
      <input
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Event Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <div className="mm-popup__box__footer__right-space">
        <button
          className="mm-popup__btn"
          onClick={() => onSave(title, location)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EventForm;