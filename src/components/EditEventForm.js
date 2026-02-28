import React, { useState } from "react";

const EditEventForm = ({ event, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(event.title);

  return (
    <div>
      <input
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mm-popup__box__footer__right-space">
        <button
          className="mm-popup__btn mm-popup__btn--info"
          onClick={() => onUpdate(title)}
        >
          Save
        </button>

        <button
          className="mm-popup__btn mm-popup__btn--danger"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditEventForm;