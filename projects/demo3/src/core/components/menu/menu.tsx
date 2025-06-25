import { NavLink } from 'react-router';
import "./menu.css";

export const Menu: React.FC = () => {
    return (
        <nav className="menu">
            <ul>
                <li>
                    <NavLink to="/" >Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/products">Products</NavLink>
                </li>
            </ul>
        </nav>
    );
};
