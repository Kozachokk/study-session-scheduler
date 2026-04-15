import SignUpBox from "./components/SignUpBox";
import Router from "next/router";

export default function Home(){
    return (
      <main className="bg-dark1 text-light3 h-full overflow-hidden flex justify-center items-center">
        <SignUpBox />
        <button onClick={()=>{Router.push("/login")}} className="absolute top-4 right-4">Log In</button>
      </main>
  );
}