import { BsFillPersonFill } from "react-icons/bs";
import "./Header.css"

function Header () {
    return (
        <div className="header-container">
            <nav className="container header-content">
                <ul>
                    <li><strong><a href="/#">Tokunbor</a></strong></li>
                </ul>
                <ul><li><a href="#"><BsFillPersonFill /></a></li></ul>
            </nav>
        </div>
    )
}

export default Header