'use client'
import { SubmitEvent, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SeachBar";
import StudySession from "./components/StudySession/StudySession";
import StudySessionList from "./components/StudySession/StudySessionList";
import IStudySession from "./components/StudySession/IStudySession";
import Router from "next/navigation";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const [studySessions, setStudySessions] = useState<IStudySession[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if(!isLoggedIn){
    router.push("/signup");
  }


  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  }



  return (
      <main className="bg-dark1 text-light3 h-full overflow-hidden ">
        <Header/>
        <SearchBar/>
        <button onClick={()=>{}}>Click me!</button>
        <StudySessionList studySessions={studySessions}></StudySessionList>
      </main>
  );
}
