require('dotenv').config();

function HomePage() {
    return (
        <div>
            This is the homepage to Group 2's front end! :)
            <br/>
            <a href = "\signup">Sign Up</a>
            <br/>
            <a href = "\login">Log In</a>
            <br/>
            <a href = "\search">Search</a>
            <br/>
            <a href = "\notifications">Notifications</a>
            <br/>
            <a href = "\dashboard">Dashboard</a>
            <br/>
            <a href = "\about">About</a>
        </div>
    )
}

export default HomePage;