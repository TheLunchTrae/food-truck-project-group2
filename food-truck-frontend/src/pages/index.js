require('dotenv').config();

function HomePage() {
    return (
        <div style = {{backgroundColor: '#90AACB', padding: '10px', fontFamily: 'poppins'}}>
            <div name="menuBar" className="banner-area" style = {{ margin: 'auto 30px', animationName: 'animate', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', height: '100vh'}}>

              <div class="wrapper" style = {{width: '1170px', margin: '0 auto'}}>
                <div class="navigation" style = {{height: '60px'}}>
                  <a href = "\" style = {{textDecoration: 'none', width: '20%', float: 'left', padding: '30px 0 0',fontSize: '25px', fontWeight: '700', color: '#FFFFFF'}}>
                    Food Truck Finder
                  </a>
                  <nav style = {{width: '75%', float: 'right', textAlign: 'right', padding: '30px 0 0', fontSize: '1rem'}}>
                    <a href = "\signup" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Sign Up</a>
                    <a href = "\login" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Log In</a>
                    <a href = "\search" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Search</a>
                    <a href = "\dashboard" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard</a>
                    <a href = "\about" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>About</a>
                  </nav>
                </div>

                <div class="banner-text">
                  <div class="text-area" style = {{textAlign: 'center', width: '75%', margin: '0 auto'}}>
                    <h2 style = {{fontSize: '75px', color: '#FFFFFF', margin: '10% 0 0'}}>Food Truck Finder</h2>
                    <h3 style = {{color: '#FFFFFF', textTransform: 'uppercase', margin: '0 0 15px', fontSize: '35px'}}>Group 2</h3>
                    <p style = {{fontSize: '18px', color: '#FFFFFF', width: '70%', margin: '0 auto', lineHeight: '1.9'}}>IDK WHAT YALL WANNA PUT HERE</p>
                  </div>
                </div>
              </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div style = {{color: '#FF0000', fontSize: '30px'}}>REMOVE ONCE SESSIONS IMPLEMENTED, WE NEED TO PUT IN INDIVIDUAL PEOPLE</div>
              <a href = "\details" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Dashboard (Customer)</a>
              <a href = "\editAccount" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Edit Account</a>
              <a href = "\editTruck" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Edit Truck</a>
              <a href = "\createTruck" style = {{textDecoration: 'none', color: '#FFFFFF', padding: '15px 20px'}}>Create Truck</a>
            </div>
        </div>


    )
}

export default HomePage;