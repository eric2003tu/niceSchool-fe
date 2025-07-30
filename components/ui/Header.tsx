"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface NavItem {
  title: string;
  href?: string;
  subItems?: NavItem[];
}

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navs: NavItem[] = [
    { title: "Home", href: "/" },
    {
      title: "About",
      subItems: [
        { title: "About Us", href: "/about" },
        { title: "Admissions", href: "/admissions" },
        { title: "Academics", href: "/academics" },
        { title: "Faculty & Staff", href: "/faculty" },
        { title: "Campus & Facilities", href: "/campus" },
      ],
    },
    { title: "Students Life", href: "/students-life" },
    { title: "News", href: "/news" },
    { title: "Alumni", href: "/alumni" },
    {
      title: "More Pages",
      subItems: [
        { title: "News Details", href: "/news-details" },
        { title: "Event Details", href: "/event-details" },
        { title: "Privacy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Error 404", href: "/404" },
        { title: "Starter Page", href: "/starter" },
      ],
    },
    {
      title: "Dropdown",
      subItems: [
        { title: "Dropdown 1", href: "/dropdown1" },
        { title: "Deep Dropdown", href: "/deep" },
        { title: "Dropdown 2", href: "/dropdown2" },
        { title: "Dropdown 3", href: "/dropdown3" },
        { title: "Dropdown 4", href: "/dropdown4" },
      ],
    },
    { title: "Contact", href: "/contact" },
  ];

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header className="w-full flex items-center justify-between sticky top-0 left-0 z-[1000] py-4 text-white bg-gray-900 shadow-md lg:px-24 px-4 backdrop-blur-2xl">
      {/* Logo */}
      <div className="flex items-center text-2xl font-bold gap-2">
        <img
          src="/apple-touch-icon.png"
          alt="NiceSchool Logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <span>NiceSchool</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex flex-1 justify-end">
        <ul className="flex gap-8 items-center relative">
          {navs.map((nav, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(index)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {nav.subItems ? (
                <button
                  className="flex items-center gap-1 hover:text-green-400 transition-colors"
                  aria-expanded={openDropdown === index}
                >
                  {nav.title}
                  <ChevronDown className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={nav.href || "#"}
                  className="hover:text-green-400 transition-colors"
                >
                  {nav.title}
                </Link>
              )}

              {nav.subItems && openDropdown === index && (
                <ul className="absolute top-full left-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md p-2 z-50 min-w-[200px]">
                  {nav.subItems.map((sub, i) => (
                    <li key={i}>
                      <Link
                        href={sub.href || "#"}
                        className="block px-4 py-2 rounded hover:bg-gray-100 hover:text-green-500 transition-colors"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-screen max-w-fit w-fit px-6 bg-gray-900 text-white shadow-lg z-[9999] transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          {navs.map((nav, i) => (
            <li key={i}>
              <Link
                href={nav.href || "#"}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium hover:text-green-400 transition-colors"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
