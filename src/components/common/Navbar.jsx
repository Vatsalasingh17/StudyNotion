import React from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links"; // Array of nav link objects (e.g., [{title, path}, ...])
import { useLocation } from 'react-router-dom';

/**
 * Navbar Component
 * 
 * Displays the main site navigation bar with the logo and navigation links.
 * It uses React Router's `Link` for client-side navigation and `useLocation`
 * to highlight or detect the current active route.
 */
const Navbar = () => {
  // Get the current location (URL path)
  const location = useLocation();

  /**
   * Helper function to check if the current route matches the given route
   * Used for highlighting the active navigation link.
   * 
   * @param {string} route - The route path to compare with current location
   * @returns {boolean} True if the current URL matches the given route
   */
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      {/* Outer container for navbar content */}
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* ---------- Logo Section ---------- */}
        <Link to="/">
          {/* Company / App Logo */}
          <img
            src={logo}
            alt="Logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        {/* ---------- Navigation Links ---------- */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {/* Special handling for "Catalog" link (currently placeholder) */}
                {link.title === "Catalog" ? (
                  <div></div>
                ) : (
                  <Link to={link?.path}>
                    {/* You could conditionally style this <p> if matchRoute(link.path) === true */}
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25 font-semibold" // active link style
                          : "text-richblack-25"
                      } hover:text-yellow-25 transition-all duration-200`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default Navbar;
