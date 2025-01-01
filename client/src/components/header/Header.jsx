import { BsFillPersonFill } from "react-icons/bs";
import "./Header.css"

function Header () {
    return (
        <div className="header-container">
            <nav className="container header-content">
                <ul>
                    <li><strong>Tokunbor</strong></li>
                </ul>
                <ul><li><BsFillPersonFill /></li></ul>
            </nav>
        </div>
    )
}

export default Header