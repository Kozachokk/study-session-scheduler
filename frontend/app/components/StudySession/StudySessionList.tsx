import IStudySession from "./IStudySession";
import StudySession from "./StudySession";

export default function StudySessionList({studySessions}: {studySessions: IStudySession[]}){
  return (<div className="flex flex-row justify-around bottom-[5vh] absolute w-screen text-5xl">
    {studySessions.map((session: IStudySession) => {
      return (<StudySession props={session} />)
    })}
  </div>);
}