import React, { useState} from 'react'
import './Navbar.css'

const Navbar = () => {
    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    } 

  return (
    <>
        <nav>
            <div className='burger-menu' data-testid="open-menu" onClick={updateMenu}>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
            </div>

            <div className='search-bar'>
                <input type="text" placeholder='Search'/>
            </div>

            <ul>
                <li className='login-button' data-testid="logbut"><a href="/login">Login</a></li>
            </ul>            
        </nav>

        <div className={menu_class}>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/calendar">Calendar</a></li>
            </ul>
        </div>
    </>
  )
}

export default Navbar
