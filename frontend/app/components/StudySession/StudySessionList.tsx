import IStudySession from "./IStudySession";
import StudySession from "./StudySession";

export default function StudySessionList(studySessions: IStudySession[]){
  return (<div>
    {studySessions.map((session: IStudySession) => {
      return (<StudySession name={session.name} isOnline={session.isOnline} place={session.place} />)
    })}
  </div>);
}