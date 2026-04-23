"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/customers", label: "Khách hàng" },
  { href: "/drivers", label: "Tải Driver" },
  { href: "/news", label: "Tin tức" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Hiệp POS"
              width={120}
              height={40}
              className="h-10 object-contain"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
                  pathname === link.href
                    ? "text-[var(--color-primary)] font-semibold"
                    : "text-[var(--color-text)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Phone Button */}
          <a
            href="tel:0855285872"
            className="hidden lg:flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
              />
            </svg>
            085 528 5872
          </a>

          {/* Mobile: Phone + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:0855285872"
              className="flex items-center gap-1.5 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
                />
              </svg>
              Gọi ngay
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-bg-light)] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-[var(--color-border)] py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)] ${
                  pathname === link.href
                    ? "text-[var(--color-primary)] font-semibold bg-[var(--color-primary-light)]"
                    : "text-[var(--color-text)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
