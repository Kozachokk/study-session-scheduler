import IStudySession from "./IStudySession";

export default function StudySession(props: IStudySession){
  return(<div className="w-1/3">
    <p>{props.name}</p>
    {props.isOnline? <p>is Online</p> : <p>Is in-person</p>}
    <p>{props.place}</p>
  </div>);
}