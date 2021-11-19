require('dotenv').config();
import MenuBar from '../menuBar';
import styles from './index.module.scss';

function HomePage() {
    return (
        <html>
            <body class={styles.body}>
                <MenuBar/>
                <div class="banner-text">
                    <div class="text-area" style = {{textAlign: 'center', width: '75%', margin: '0 auto'}}>
                        <h2 style = {{fontSize: '75px', color: '#FFFFFF', margin: '10% 0 0'}}>Food Truck Finder</h2>
                        <h3 style = {{color: '#FFFFFF', textTransform: 'uppercase', margin: '0 0 15px', fontSize: '35px'}}>Group 2</h3>
                        <p style = {{fontSize: '18px', color: '#FFFFFF', width: '70%', margin: '0 auto', lineHeight: '1.9'}}>Welcome to the Food Truck Finder Application for Group 2!</p>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default HomePage;