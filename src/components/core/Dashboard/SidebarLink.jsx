import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { NavLink, matchPath, useLocation } from 'react-router-dom'

const SidebarLink = ({ link, iconName }) => {

    // Dynamically pick the correct icon from the react-icons library
    const Icon = Icons[iconName];

    // Hook to access the current browser location (URL path)
    const location = useLocation();

    // Redux dispatch (not currently used but imported for future use)
    const dispatch = useDispatch();

    // Helper function to check if the current route matches this sidebar link's path
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        // NavLink from React Router allows active styling for navigation links
        <NavLink
            to={link.path} // Navigate to the link's route
            className={`
                relative px-8 py-2 text-sm font-medium
                ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}
            `}
        >
            {/* Left Highlight Bar (active indicator) */}
            <span
                className={`
                    absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
                    ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
                `}
            ></span>

            {/* Icon and Link Text */}
            <div className='flex items-center gap-x-2'>
                {/* Render the selected VSC icon */}
                <Icon className="text-lg" />

                {/* Sidebar link name */}
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
};

export default SidebarLink
