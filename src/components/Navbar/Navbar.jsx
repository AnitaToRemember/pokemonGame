import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../Navbar/Navbar.css";

function Navbar() {
    const [active, setActive] = useState(false);

    const links = [
    { page: "Home", href: "/", external: false },
    { page: "Portfolio", href: "https://bbds-group.com/", external: true },
    { page: "Services", href: "https://bbds-group.com/our-services/", external: true },
    { page: "LinkedIn", href: "https://www.linkedin.com/in/anabest/", external: true },
    ];

    const toggleNavbar = () => {
    setActive(!active);
    };

    const handleNavLinkClick = () => {
    setActive(false);
    };

return (
    <nav className={`navbar ${active ? "open" : ""}`}>
        <div className="logo">Guess the Pokémon Game </div>

        <FontAwesomeIcon
        className="menu-icon"
        icon={faBars}
        onClick={toggleNavbar}
        />

        <ul className={`nav-links ${active ? "active" : ""}`}>
        {links.map(({ page, href, external }) => (
                <li key={page}>
                    {external ? (
                        <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleNavLinkClick}
                        >
                        {page}
                        </a>
                    ) : (
                        <NavLink to={href} onClick={handleNavLinkClick}>
                        {page}
                        </NavLink>
                    )}
                </li>
            ))}
        </ul>
    </nav>
  );
}

export default Navbar;
