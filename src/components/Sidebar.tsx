"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* mobile menu toggle */}
      <div className="flex items-center justify-between px-4 py-2 shadow-md sm:hidden">
        <button
          type="button"
          className="mt-2 inline-flex items-center rounded-lg text-sm text-primary sm:hidden"
          onClick={() => setIsMobileMenuActive(true)}
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
        <h1 className="text-sm font-bold uppercase text-primary">Damar</h1>
      </div>
      {/* sidebar component. -translate-x-full to make it hidden */}
      <nav
        className={`fixed left-0 top-0 z-40 h-screen w-48 transition-transform sm:translate-x-0 ${
          isMobileMenuActive ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto bg-secondary pt-4">
          <ul className="flex flex-col">
            <Link
              href="/products"
              className={`px-3 py-2 text-lg font-bold ${
                pathname.startsWith("/products") ? "bg-primary text-secondary" : "text-primary"
              }`}
            >
              Products
            </Link>
            <Link
              href="/carts"
              className={`px-3 py-2 text-lg font-bold ${
                pathname.startsWith("/carts") ? "bg-primary text-secondary" : "text-primary"
              }`}
            >
              Carts
            </Link>
          </ul>
        </div>
      </nav>
      <main className="p-4 sm:ml-48">{children}</main>
      {/* overlay. close sidebar when clicked */}
      {isMobileMenuActive ? (
        <div
          className="fixed inset-0 z-10 block bg-black opacity-50 sm:hidden"
          onClick={() => setIsMobileMenuActive(false)}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default Sidebar;
