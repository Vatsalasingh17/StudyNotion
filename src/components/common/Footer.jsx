import React from "react";
import { FooterLink2 } from "../../data/footer-links"; // Importing additional footer link data
import { Link } from "react-router-dom"; // React Router for client-side navigation

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Social Media Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// Static footer link arrays
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

/**
 * Footer Component
 *
 * Displays the main site footer with multiple sections:
 *  - Company info and social media links
 *  - Resource, Plan, and Community links
 *  - Dynamic link sections (from `FooterLink2`)
 *  - Bottom bar with policies and credits
 */
const Footer = () => {
  return (
    <div className="bg-richblack-800">
      {/* ================================
          MAIN FOOTER CONTENT SECTION
          ================================= */}
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        {/* Top part divided into 2 halves */}
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          
          {/* ---------- LEFT HALF: Static Company Links ---------- */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">

            {/* Company Info + Socials */}
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              {/* Company logo */}
              <img src={Logo} alt="Company Logo" className="object-contain" />

              <h1 className="text-richblack-50 font-semibold text-[16px]">Company<
