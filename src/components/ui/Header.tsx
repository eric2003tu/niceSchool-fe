"use client";

import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface NavItem {
  title: string;
  href?: string;
  subItems?: NavItem[];
}
interface currentPage{
  name: string;
}

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<number[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
    { title: "Events", href: "/events" },
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileItem = (index: number) => {
    setExpandedMobileItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <header className="w-full flex items-center justify-between sticky top-0 left-0 z-[1000] py-4 text-white bg-gray-900 shadow-lg lg:px-24 px-4 backdrop-blur-2xl">
      {/* Logo */}
      <div className="flex items-center text-2xl font-bold gap-2">
        <img
          src="apple-touch-icon.png"
          alt="NiceSchool Logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <span>NiceSchool</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex flex-1 justify-end" ref={menuRef}>
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
                  className={`flex items-center gap-1 hover:text-green-400 transition-colors`}
                  aria-expanded={openDropdown === index}
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                >
                  {nav.title}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={nav.href || "#"}
                  className={`hover:text-green-400 transition-colors`}
                >
                  {nav.title}
                </Link>
              )}

              {nav.subItems && openDropdown === index && (
                <ul className="absolute top-full left-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md p-2 z-50 min-w-[200px] animate-fadeIn">
                  {nav.subItems.map((sub, i) => (
                    <li key={i}>
                      <Link
                        href={sub.href || "#"}
                        className="block px-4 py-2 rounded hover:bg-gray-100 hover:text-green-500 transition-colors"
                        onClick={() => setOpenDropdown(null)}
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

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] lg:hidden" />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-screen w-80 bg-gray-900 text-white shadow-lg z-[9999] transition-all duration-700 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center text-xl font-bold gap-2">
            <img
              src="/apple-touch-icon.png"
              alt="NiceSchool Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span>NiceSchool</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-1"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)] p-4">
          <ul className="flex flex-col gap-1">
            {navs.map((nav, i) => (
              <li key={i} className="border-b border-gray-700 last:border-0">
                {nav.subItems ? (
                  <>
                    <button
                      className="w-full flex justify-between items-center py-3 px-2 hover:text-green-400 transition-colors"
                      onClick={() => toggleMobileItem(i)}
                      aria-expanded={expandedMobileItems.includes(i)}
                    >
                      <span className="text-lg">{nav.title}</span>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          expandedMobileItems.includes(i) ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-700 ${
                        expandedMobileItems.includes(i)
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="pl-4 py-2 space-y-2">
                        {nav.subItems.map((sub, j) => (
                          <li key={j}>
                            <Link
                              href={sub.href || "#"}
                              className="block py-2 px-2 rounded hover:bg-gray-800 hover:text-green-400 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={nav.href || "#"}
                    className="block py-3 px-2 hover:text-green-400 transition-colors text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {nav.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;