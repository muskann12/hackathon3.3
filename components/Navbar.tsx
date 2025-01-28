"use client";
import Link from "next/link";
import { Navlinks } from "../constants";
import React, { useState, useEffect } from "react";
import { BiSearch, BiMenu, BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [easterEggBuffer, setEasterEggBuffer] = useState<number[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const _m = "TWFkZSBieSBTeWVkIE1hc2hob29kIEh1c3NhaW4g8J+OiQ==";
  const _d = (s: string) => Buffer.from(s, "base64").toString();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Filter links based on the search query
  const filteredLinks = Navlinks.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Add safety check for e.key before using toLowerCase
      if (e.key && e.key.toLowerCase() === "e") {
        const now = Date.now();
        setEasterEggBuffer((prev) => {
          const newBuffer = [...prev, now].filter((time) => now - time < 1000);
          if (newBuffer.length === 3) {
            setShowEasterEgg(true);
            setTimeout(() => setShowEasterEgg(false), 3000);
            return [];
          }
          return newBuffer;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white sticky top-0 z-50 shadow-sm"
    >
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {_d(_m)}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-4 h-24 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <button
            className="lg:hidden text-2xl hover-scale"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <BiX /> : <BiMenu />}
          </button>
          <h1 className="font-bold text-xl cursor-pointer hover-scale">
            <Link href="/" passHref>
              <img
                src="/images/logo.png"
                alt="Logo"
                className="border-none p-0"
              />
            </Link>
          </h1>
        </motion.div>

        {/* Desktop Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:flex items-center max-w-md w-full mx-4 bg-[#f2f0f1] rounded-full relative"
        >
          <div className="relative w-full">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border-none outline-none bg-transparent"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          {/* Dropdown with filtered results */}
          {searchQuery && (
            <ul className="absolute left-0 top-full mt-2 bg-white w-full shadow-md rounded-lg overflow-hidden z-10">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:flex items-center gap-4"
        >
          {Navlinks.map((links, index) => (
            <motion.li
              key={links.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="py-2 px-4 hover:bg-gray-50 rounded-lg cursor-pointer hover-scale"
            >
              <Link href={links.link} className="!p-0 !border-none">
                {links.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <ul className="container mx-auto px-4 py-4">
              {Navlinks.map((links, index) => (
                <motion.li
                  key={links.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="py-2"
                >
                  <Link href={links.link} className="!p-0 !border-none">
                    {links.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
