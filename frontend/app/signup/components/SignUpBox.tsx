'use client';
import { SubmitEvent, useState } from "react";
import InputBox from "./InputBox";

function SignUpBox(){
    const [firstName, setFirstName] = useState<string | null>();
    const [lastName, setLastName] = useState<string | null>();
    const [email, setEmail] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();
    const [confirmPassword, setConfirmPassword] = useState<string | null>();



    const signUpUser = async (e:SubmitEvent) => {
        e.preventDefault();
        console.log(password);
        const response: unknown = await fetch("http://localhost:3000/auth/signup", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                first_name: firstName,
                last_name: lastName,
                password: password
            }),
        });
        console.log(response);
    }

    return(
    <form className="border-light3 rounded-md border-2 pt-8 pb-4" onSubmit={(e:SubmitEvent) => {signUpUser(e)}}>
        <h2 className="mb-8 text-5xl text-center">Sign Up</h2>
        
        <div className="flex flex-col text-left mr-[5vw] ml-[5vw]">
            <InputBox label="First Name: " id="firstname" type="text" onChange={(event) => {setFirstName(event.target.value);}} />
            <InputBox label="Last Name: " id="lastname" type="text" onChange={(event) => {setLastName(event.target.value);}} />
            <InputBox label="Email: " id="email" type="email" onChange={(event) => {setEmail(event.target.value);}} />
            <InputBox label="Password" id="password" type="password" onChange={(event) => {setPassword(event.target.value);}} />
            <InputBox label="Confirm Password: " id="confirmPassword" type="password" onChange={(event) => {setConfirmPassword(event.target.value);}} />
            <button type='submit' className="mt-2">Sign Up</button>
        </div>
    </form>
)
}

export default SignUpBox;