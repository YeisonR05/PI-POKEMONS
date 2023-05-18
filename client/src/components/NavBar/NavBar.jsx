import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
    return( 
        <div>
            <div className={style.mainContainer}>
                <Link to='/home'>Home</Link>
            </div>
          
        </div>
    )
}

export default NavBar;