import styles from './Header.module.css'
import logo from '../../img/logo.png'

function Header () {

    return(
 <div className={styles.header}>
      <div className={styles.logo}>
        <img  src={logo} alt="Logo" />
      </div>
    </div>
  )
}

export default Header