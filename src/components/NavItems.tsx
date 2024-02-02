"use client";

import { useState } from "react";
import NavLink from "./NavLink";

const links = [
  { href: "/about", text: "About" },
  { href: "/contact", text: "Contact" },
  { href: "/coaching", text: "Coaching" },
  { href: "/free-resources", text: "Free Resources" },
];

const NavItems = () => {
  return (
    <div className="flex gap-1.5 h-full">
      {links.map((link, index) => {
        return (
          <NavLink key={link.text} href={link.href}>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavItems;
