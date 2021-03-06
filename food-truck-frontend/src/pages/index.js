require('dotenv').config();
import styles from './index.module.scss';
import MenuBar from './universal/menuBar';
import DefaultMap from './MapComponents/DefaultMap';

export { MenuBar, DefaultMap };

function HomePage() {
    return (
        <html>
           <body class={styles.body}>
                <MenuBar/>
                <div class="banner-text">
                    <div class="text-area" style = {{textAlign: 'center', width: '75%', margin: '0 auto', fontFamily: 'Playfair Display'}}>
                        <h2 style = {{fontSize: '75px', color: '#000000', margin: '10% 0 0'}}>Food Truck Finder</h2>
                        <h3 style = {{color: '#000000', textTransform: 'uppercase', margin: '0 0 15px', fontSize: '35px'}}>Group 2</h3>
                        <p style = {{fontSize: '18px', color: '#000000', width: '70%', margin: '0 auto', lineHeight: '1.9'}}>Welcome to the Food Truck Finder Application for Group 2!</p>
                    </div>
                    
                    <div style={{marginTop: '30px', textAlign: 'center', display: 'block'}}>
                        <img style={{width: '400px', height: '240px'}} src={"https://www.bakemag.com/ext/resources/images/TiffsTreats_FoodTruck.jpg?t=1604679543"}/>
                    </div>
                </div>
            </body>
        </html>
    )
}



export default HomePage;