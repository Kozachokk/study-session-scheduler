'use client'
import { SubmitEvent } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SeachBar";
import StudySession from "./components/StudySession/StudySession";
import StudySessionList from "./components/StudySession/StudySessionList";
import IStudySession from "./components/StudySession/IStudySession";


export default function Home() {

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  }
  const studySessions: IStudySession[] = [
    {name:"Hello", isOnline:false, place:"School"},
    {name:"Hello", isOnline:true, place:"Google Meet"},
    {name:"true", isOnline:false, place:"School"}
  ]

  return (
      <main className="bg-dark1 text-light3 h-full overflow-hidden ">
        <Header/>
        <SearchBar/>
        <StudySession name="Hello" isOnline={false} place="School"/>
        <StudySessionList studySessions={studySessions}></StudySessionList>
      </main>
  );
}
