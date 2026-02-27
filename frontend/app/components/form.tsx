'use client'
import { SubmitEvent } from "react";


export default function Form() {

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  }

  return (
        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
          <label htmlFor="session-name">Session's Name</label>
          <input type="text" name="session-name" id="session-name" className="border-2 rounded-md pl-2 selection::bg-transparent mb-2"></input>
          <ul>
            <li>
              <label htmlFor="in-person" className="mr-2">In Person</label>
              <input type="radio" name="place" id="in-person" value="in-person"></input>
            </li>
            <li>
              <label htmlFor="remote" className="mr-2">Remote</label>
              <input type="radio" name="place" id="remote" value="remote"></input>
            </li>
          </ul>
          <label htmlFor="address">Meeting place:</label>
          <input type="text" name="address" id="address" className="border-2 rounded-md pl-2 selection::bg-transparent"></input>
          <button type="submit">Submit</button>
        </form>
  );
}
