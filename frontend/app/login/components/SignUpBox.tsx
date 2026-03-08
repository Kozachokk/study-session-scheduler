'use client';
import { SubmitEvent } from "react";

function SignUpBox(){
    const signUpUser = async (e:SubmitEvent) => {
        e.preventDefault();
        console.log(e.target);
        const response = await fetch("http://localhost:3000/student/adduser", {
            method:"POST",
            body: JSON.stringify({
                username: "hello",
            })
        })
    }

    return(
    <form className="flex flex-col border-light3 rounded-md border-2 pt-8 pb-4" onSubmit={(e:SubmitEvent) => {signUpUser(e)}}>
        <h2 className="mb-8 text-5xl">Sign Up</h2>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' className="text-2xl border-2 rounded-md pl-2 selection::bg-transparent mb-2 w-[25vw] ml-[2.5vw] mr-[2.5vw]"></input>
        <label htmlFor='passwd'>Password:</label>
        <input type='password' name='passwd' id='passwd' className="text-2xl border-2 rounded-md pl-2 selection::bg-transparent mb-2 w-[25vw] ml-[2.5vw] mr-[2.5vw]"></input>
        <button type='submit' className="mt-2">Sign Up</button>
    </form>
)
}

export default SignUpBox;