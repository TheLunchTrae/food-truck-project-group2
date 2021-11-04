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
            <a href = "\dashboard">Dashboard (Food Truck Owner)</a>
            <br/>
            <a href = "\details">Dashboard (Customer)</a>
            <br/>
            <a href = "\about">About</a>
            <br/>
            <a href = "\createTruck">Create Truck</a>
        </div>
    )
}

export default HomePage;