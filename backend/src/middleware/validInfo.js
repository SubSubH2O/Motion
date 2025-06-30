module.exports = (req, res, next) => {
    const {username, email, password} = req.body;

    const validEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if (req.path === "/register") {
        if(![username, email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email")
        }
    } else if (req.path === "/login") {
        if(![username, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
    }

    next();
};