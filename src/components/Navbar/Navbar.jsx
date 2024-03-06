import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'

function Navbar() {
const [active, setActive] = useState(false);

const link = [
{ page: "Home", href: "/" },
{ page: "About Me", href: "/about" },
{ page: "Portfolio", href: "/portfolio" },
{ page: "Services", href: "/services" },
{ page: "Contact", href: "/contact" },
];

const handleNavLinkClick = () => {
setActive(false); 
};

return (
<section className="header-bar">
    <nav className={`NavbarWrapper ${active ? "active" : ""}`}>
    <div className="hamburger-menu">
        <FontAwesomeIcon
        className="StyledFontAwesomeIcon"
        icon={faBars}
        onClick={() => setActive(!active)}
        />
    </div>

    <div className={`nav-links ${active ? "active" : ""}`}>
        <ul className="NavLinkWrapper">
        {link.map((link) => (
            <li key={link.page}>
            <NavLink
                to={link.href}
                className={`StyledNavLink ${active ? "active" : ""}`}
                onClick={handleNavLinkClick}
            >
                {link.page}
            </NavLink>
            </li>
        ))}
        </ul>
    </div>
    </nav>
</section>
);
}

export default Navbar;
