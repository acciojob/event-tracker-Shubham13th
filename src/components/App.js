
import React, { useState } from "react";
import './../styles/App.css';

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const App = () => {

  const [month, setMonth] = useState(2);
  const [year, setYear] = useState(2026);

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push("");
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  while (days.length % 7 !== 0) {
    days.push("");
  }


  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div id="main">
      <h1 id="event-tracker">Event Tracker</h1>
      <div>
        <div id="navigation">
          <div>
            <button id="prev-month" onClick={prevMonth}>&larr; prev</button>
            <button id="next-month" onClick={nextMonth}>next &rarr;</button>
          </div>

          <div>{months[month]} {year}</div>
          <div>
            <button id='all-events'>All</button>
            <button id='past-events'>Past</button>
            <button id='upcoming-events'>Upcoming</button>
          </div>

        </div>

        <div id="calendar">
          <table id="calendar-table">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, i) => (
                <tr key={i}>
                  {week.map((day, j) => (
                    <td key={j}>{day}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
