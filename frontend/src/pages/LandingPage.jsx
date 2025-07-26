import { useState } from "react";
import axios from "axios";

const LandingPage = () => {

    const [signInEmail, setSignInEmail] = useState("");
    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");


    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log(" inside handleSIgnIn")
        console.log(signInUsername)
        console.log(signInPassword)
        try {
            const response = await axios.post("/api/v1/auth/login", {username: signInUsername, password: signInPassword})
        } catch (err) {
            console.error(err.message)
        }

    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/auth/register", {
                username: signUpUsername,
                email: signUpEmail,
                password: signUpPassword
            });
            // Optionally: handle success (e.g., show a message, redirect, etc.)
            console.log("Sign up successful", response.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }


    return (
        <>
            <h1>Motion</h1>
            <h3>Taking notes is no longer a one man thing!</h3>
            <div>
                <form onSubmit = {handleSignIn}>
                    <p>Sign in</p>
                    <label>Username: </label>
                    <input type="text" value={signInUsername} onChange={(e) => {setSignInUsername(e.target.value)}}></input>
                    <label>Password:</label>
                    <input type="password" value={signInPassword} onChange={(e) => {setSignInPassword(e.target.value)}}></input>
                    <button type="submit" className="bg-blue-500" onClick={() => console.log("Sign In button clicked")}>Sign In</button>
                </form>
                <form onSubmit = {handleSignUp}>
                    <p>Sign Up</p>
                    <label>Username:</label>
                    <input type="text" value={signUpUsername} onChange={(e) => {setSignUpUsername(e.target.value)}}></input>
                    <label>Email Address:</label>
                    <input type="email" value={signUpEmail} onChange={(e) => {setSignUpEmail(e.target.value)}}></input>
                    <label>Password:</label>
                    <input type="password" value={signUpPassword} onChange={(e) => {setSignUpPassword(e.target.value)}}></input>
                    <button type="submit" className="bg-blue-500">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default LandingPage;