'use client';
import { SubmitEvent, useState } from "react";
import InputBox from "./InputBox";

function LoginBox(){
    const [email, setEmail] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();



    const loginUser = async (e:SubmitEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/auth/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        console.log(response);
    }

    return(
    <form className="border-light3 rounded-md border-2 pt-8 pb-4" onSubmit={(e:SubmitEvent) => {loginUser(e)}}>
        <h2 className="mb-8 text-5xl text-center">Log In</h2>
        
        <div className="flex flex-col text-left mr-[5vw] ml-[5vw]">
            <InputBox label="Email: " id="email" type="email" onChange={(event) => {setEmail(event.target.value);}} />
            <InputBox label="Password" id="password" type="password" onChange={(event) => {setPassword(event.target.value);}} />
            <button type='submit' className="mt-2">Log In</button>
        </div>
    </form>
)
}

export default LoginBox;