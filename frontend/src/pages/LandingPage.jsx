const LandingPage = () => {


    return (
        <>
            <h1>Motion</h1>
            <h3>Taking notes is no longer a one man thing!</h3>
            <div className="login&singup">
                <div className="login bg-red-500">
                    <p>Sign in</p>
                    <label>Username</label>
                    <input type="text"></input>
                    <label>Password</label>
                    <input type="password"></input>
                </div>
                <div className="signup bg-blue-500">
                    <label>Username</label>
                    <input type="text"></input>
                    <label>Email Address</label>
                    <input type="email"></input>
                    <label>Password</label>
                    <input type="password"></input>
                </div>
            </div>
        </>
    )
}

export default LandingPage;