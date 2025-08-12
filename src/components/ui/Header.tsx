"use client";

import { ChevronDown, ChevronRight, Menu, X, User } from "lucide-react";
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
        { title: "Starter Page", href: "/starter" },
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
    <header className="w-full flex items-center justify-between sticky top-0 left-0 z-[1000] py-4 text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-2xl lg:px-24 px-4 backdrop-blur-2xl border-b border-blue-900/20">
      {/* Logo */}
      <div className="flex items-center text-2xl font-bold gap-2">
        <img
          src="apple-touch-icon.png"
          alt="NiceSchool Logo"
          width={40}
          height={40}
          className="rounded-md shadow-lg ring-2 ring-white/20"
        />
        <span className="text-white font-bold">NiceSchool</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex flex-1 justify-end items-center gap-6" ref={menuRef}>
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
                  className={`flex items-center gap-1 hover:text-blue-200 transition-all duration-200 font-medium text-white`}
                  aria-expanded={openDropdown === index}
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                >
                  {nav.title}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={nav.href || "#"}
                  className={`hover:text-blue-200 transition-all duration-200 font-medium text-white`}
                >
                  {nav.title}
                </Link>
              )}

              {nav.subItems && openDropdown === index && (
                <ul className="absolute top-full left-0 mt-2 bg-white text-gray-800 shadow-2xl rounded-xl p-3 z-50 min-w-[220px] animate-fadeIn border border-gray-100">
                  {nav.subItems.map((sub, i) => (
                    <li key={i}>
                      <Link
                        href={sub.href || "#"}
                        className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium"
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
        
        {/* Prominent Login Button - Desktop */}
        <Link
          href="/login"
          className="ml-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 hover:border-white/30"
        >
          <User size={18} />
          Login
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none p-2 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden" />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-screen w-80 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-white shadow-2xl z-[9999] transition-all duration-700 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } border-l border-blue-600/30`}
      >
        <div className="flex justify-between items-center p-6 border-b border-blue-600/30 bg-blue-600/20">
          <div className="flex items-center text-xl font-bold gap-2">
            <img
              src="/apple-touch-icon.png"
              alt="NiceSchool Logo"
              width={32}
              height={32}
              className="rounded-md shadow-lg ring-2 ring-white/20"
            />
            <span className="text-white">NiceSchool</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-2 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)] p-6">
          {/* Prominent Login Button - Mobile */}
          <div className="mb-8">
            <Link
              href="/login"
              className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm border border-white/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={20} />
              Login
            </Link>
          </div>
          
          <ul className="flex flex-col gap-2">
            {navs.map((nav, i) => (
              <li key={i} className="border-b border-blue-600/20 last:border-0">
                {nav.subItems ? (
                  <>
                    <button
                      className="w-full flex justify-between items-center py-4 px-3 hover:text-blue-200 hover:bg-blue-600/10 transition-all duration-200 rounded-lg font-medium"
                      onClick={() => toggleMobileItem(i)}
                      aria-expanded={expandedMobileItems.includes(i)}
                    >
                      <span className="text-lg">{nav.title}</span>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          expandedMobileItems.includes(i) ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
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
                              className="block py-3 px-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-200 transition-all duration-200 font-medium"
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
                    className="block py-4 px-3 hover:text-blue-200 hover:bg-blue-600/10 transition-all duration-200 text-lg rounded-lg font-medium"
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