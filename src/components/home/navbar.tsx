"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";

export default function NavbarComp() {
  const navItems = [
    {
      name: "Product",
      link: "/product",
    },
    {
      name: "Imagine",
      link: "/imagine",
    },
    {
      name: "Community",
      link: "/community",
    },
    {
      name: "Pricing",
      link: "/princing",
    },
    {
      name: "Learn",
      link: "/learn",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div  
      className="mx-auto flex justify-between items-center"
    >
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center">
            <NavbarButton href="/sign-in"  variant="secondary" className="!text-gray-900">Login</NavbarButton>
            <NavbarButton href="/sign-up" variant="dark" className="rounded-2xl !bg-gray-900 !text-gray-200">Try Kairo Free</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-gray-900"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                href="/sign-in"
                variant="dark"
                className="w-full !bg-gray-900 !text-gray-200"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                href="/sign-up"
                variant="dark"
                className="w-full !bg-gray-900 !text-gray-200"
              >
                Try Kairo Free
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

