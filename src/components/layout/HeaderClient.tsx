"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
  </svg>
);

export default function HeaderClient({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Hiệp POS"
              width={140}
              height={50}
              className="h-14 object-contain"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children && link.children.length > 0 ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[var(--color-primary)] inline-flex items-center gap-1 ${
                      isActive(link.href)
                        ? "text-[var(--color-primary)] font-semibold"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 mt-0.5 opacity-60" />
                  </Link>
                  {/* Dropdown panel */}
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50 min-w-[200px]">
                    <div className="bg-white rounded-xl shadow-lg border border-[var(--color-border)] py-1.5 overflow-hidden">
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wide border-b border-[var(--color-border)] mb-1"
                      >
                        Tất cả {link.label}
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)] ${
                            pathname === child.href
                              ? "text-[var(--color-primary)] font-semibold bg-[var(--color-primary-light)]"
                              : "text-[var(--color-text)]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
                    isActive(link.href)
                      ? "text-[var(--color-primary)] font-semibold"
                      : "text-[var(--color-text)]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Phone Button — desktop */}
          <a
            href="tel:0855285872"
            className="hidden lg:flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <PhoneIcon />
            085 528 5872
          </a>

          {/* Mobile: Phone + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:0855285872"
              className="flex items-center gap-1.5 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
            >
              <PhoneIcon />
              Gọi ngay
            </a>
            <button
              onClick={() => { setIsOpen(!isOpen); setOpenSub(null); }}
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
          <div className="lg:hidden border-t border-[var(--color-border)] py-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.children && link.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => setOpenSub(openSub === link.href ? null : link.href)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)] ${
                        isActive(link.href)
                          ? "text-[var(--color-primary)] font-semibold"
                          : "text-[var(--color-text)]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${openSub === link.href ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openSub === link.href && (
                      <div className="ml-4 border-l-2 border-[var(--color-border)] pl-3 mb-1">
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm text-[var(--color-text-light)] hover:text-[var(--color-primary)]"
                        >
                          Tất cả {link.label.toLowerCase()}
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)] ${
                              pathname === child.href
                                ? "text-[var(--color-primary)] font-semibold"
                                : "text-[var(--color-text)]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)] ${
                      isActive(link.href)
                        ? "text-[var(--color-primary)] font-semibold bg-[var(--color-primary-light)]"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
