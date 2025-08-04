"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  X as Twitter,
  ArrowBigUp,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-16 pb-6 mt-16 max-w-screen">
      {/* Back to Top Button */}
      <div className="fixed bottom-4 right-6 z-50 bg-[#0F9255] p-3 rounded-full hover:bg-[#0c7b47] transition shadow-lg">
        <Link href='#'>
          <ArrowBigUp size={30} />
        </Link>
      </div>

      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 items-center-safe">
        {/* Logo & Contact */}
        <div>
          <h2 className="text-2xl font-bold mb-4">NiceSchool</h2>
          <p>A108 Adam Street</p>
          <p>New York, NY 535022</p>
          <p className="mt-3 font-semibold">
            Phone: <span className="font-normal">+1 5589 55488 55</span>
          </p>
          <p className="font-semibold">
            Email: <span className="font-normal">info.com</span>
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">About us</Link></li>
            <li><Link href="#">Services</Link></li>
            <li><Link href="#">Terms of service</Link></li>
            <li><Link href="#">Privacy policy</Link></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Web Design</li>
            <li>Web Development</li>
            <li>Product Management</li>
            <li>Marketing</li>
            <li>Graphic Design</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hic soluta step</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Molestiae accusamus iure</li>
            <li>Excepturi dignissimos</li>
            <li>Suscipit distinctio</li>
            <li>Dilecta</li>
            <li>Sit quas consectetur</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Nobis illum</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Ipsam</li>
            <li>Laudantium dolorum</li>
            <li>Dinera</li>
            <li>Trodelas</li>
            <li>Flexo</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-white">NiceSchool</span> — All Rights Reserved
        </p>
        <p>
          Designed by{" "}
          <span className="text-green-500 font-medium">Eric Tuyishime</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
