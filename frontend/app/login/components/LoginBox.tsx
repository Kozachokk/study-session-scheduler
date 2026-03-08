function LoginBox(){
    const logInUser = (e:SubmitEvent) => {
        e.preventDefault();
        console.log("Login");
    }

    return(
    <div className="flex flex-col border-light3 rounded-md border-2 pt-8 pb-4">
        <h2 className="mb-8 text-5xl">Log In</h2>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' className="text-2xl border-2 rounded-md pl-2 selection::bg-transparent mb-2 w-[25vw] ml-[2.5vw] mr-[2.5vw]"></input>
        <label htmlFor='passwd'>Password:</label>
        <input type='password' name='passwd' id='passwd' className="text-2xl border-2 rounded-md pl-2 selection::bg-transparent mb-2 w-[25vw] ml-[2.5vw] mr-[2.5vw]"></input>
        <button type='submit' className="mt-2">Log In</button>
    </div>
)
}

export default LoginBox;