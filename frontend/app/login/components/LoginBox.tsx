function LoginBox(){
    return(
    <div className="flex flex-col border-dark3 border-4 pt-8">
        <h2>Log In<br/>Signup</h2>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' className="border-2 rounded-md pl-2 selection::bg-transparent mb-2 w-[25vw] ml-[2.5vw] mr-[2.5vw]"></input>
        <label htmlFor='passwd'>Password:</label>
        <input type='password' name='passwd' id='passwd' className="border-2 rounded-md pl-2 selection::bg-transparent mb-2 w-[25vw] ml-[2.5vw] mr-[2.5vw]"></input>
        <button type='submit'></button>
    </div>
)
}

export default LoginBox;