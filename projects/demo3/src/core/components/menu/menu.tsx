import { NavLink } from 'react-router';
import "./menu.css";
import type { MenuOption } from '../layout/layout';

interface Props {
    options: MenuOption[]
}


export const Menu: React.FC<Props> = ({options}) => {
    return (
        <nav className="menu">
            <ul>
                {options.map(({label, path}) => (
                    <li key={label}>
                        <NavLink 
                            to={path} 
                            // className={({ isActive }) => isActive ? "active" : ""}
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
