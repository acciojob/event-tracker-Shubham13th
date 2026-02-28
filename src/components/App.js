import React, { useState } from "react";
import Calendar  from "react-big-calendar";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "./EventForm";
import EditEventForm from "./EditEventForm";
import "../styles/App.css";

const localizer = momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 🔎 Filter logic
  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    if (filter === "past")
      return moment(event.start).isBefore(moment(), "day");
    if (filter === "upcoming")
      return moment(event.start).isSameOrAfter(moment(), "day");
    return true;
  });

  // 🎨 Event coloring
  const eventStyleGetter = (event) => {
    const isPast = moment(event.start).isBefore(moment(), "day");

    return {
      style: {
        backgroundColor: isPast
          ? "rgb(222, 105, 135)"
          : "rgb(140, 189, 76)",
      },
    };
  };

  // 📅 Create event
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowCreate(true);
  };

  const handleSaveEvent = (title, location) => {
    const newEvent = {
      id: Date.now(),
      title,
      location,
      start: selectedSlot.start,
      end: selectedSlot.end,
    };

    setEvents([...events, newEvent]);
    setShowCreate(false);
  };

  // ✏️ Edit event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEdit(true);
  };

  const handleUpdateEvent = (updatedTitle) => {
    const updatedEvents = events.map((ev) =>
      ev.id === selectedEvent.id
        ? { ...ev, title: updatedTitle }
        : ev
    );
    setEvents(updatedEvents);
    setShowEdit(false);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(
      (ev) => ev.id !== selectedEvent.id
    );
    setEvents(updatedEvents);
    setShowEdit(false);
  };

  // console.log("Calendar:", Calendar);
  // console.log("momentLocalizer:", momentLocalizer);
  // console.log("EventForm:", EventForm);
  // console.log("EditEventForm:", EditEventForm);

  return (
    <div id="main">
      <h1>Event Tracker</h1>

      {/* Filter Buttons */}
      <div>
        <button className="btn" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn" onClick={() => setFilter("past")}>
          Past
        </button>
        <button className="btn" onClick={() => setFilter("upcoming")}>
          Upcoming
        </button>
      </div>

      <Calendar
        selectable
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginTop: 20 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />

      {/* CREATE POPUP */}
      {showCreate && (
        <div className="mm-popup">
          <div className="mm-popup__box">
            <EventForm onSave={handleSaveEvent} />
          </div>
        </div>
      )}

      {/* EDIT POPUP */}
      {showEdit && (
        <div className="mm-popup">
          <div className="mm-popup__box">
            <EditEventForm
              event={selectedEvent}
              onUpdate={handleUpdateEvent}
              onDelete={handleDeleteEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;