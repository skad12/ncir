
// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { User, Shield } from "lucide-react";
// import { Button } from "../ui/button"; // adjust path if needed
// import {LoginModal }from "../LoginModal"; // ← default import

// interface HeaderProps {
//   user?: { name: string; role: string } | null;
//   onLogout?: () => void;
// }

// export default function Header({ user, onLogout }: HeaderProps) {
//   const [open, setOpen] = useState(false); // mobile nav open
//   const [loginOpen, setLoginOpen] = useState(false); // login modal

//   return (
//     <>
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-2">
//               <Shield className="h-8 w-8 text-emerald-600" />
//               <div className="leading-tight">
//                 <span className="block text-lg font-bold text-gray-900">NCIR</span>
//                 <span className="block text-xs text-gray-500">
//                   National Cancer Imaging Repository
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Nav */}
//             <nav className="hidden md:flex items-center gap-6 text-sm">
//               <Link href="#about" className="text-gray-600 hover:text-gray-900">
//                 About
//               </Link>
//               <Link href="#research" className="text-gray-600 hover:text-gray-900">
//                 Research
//               </Link>
//               <Link href="/journal" className="text-gray-600 hover:text-gray-900">
//                 Journal
//               </Link>
//               <Link href="/publications" className="text-gray-600 hover:text-gray-900">
//                 Publications
//               </Link>
//               <Link href="#compliance" className="text-gray-600 hover:text-gray-900">
//                 Compliance
//               </Link>

//               {user ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-600">Hi, {user.name}</span>
//                   <Button size="sm" variant="secondary" onClick={onLogout}>
//                     Logout
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Button size="sm" onClick={() => setLoginOpen(true)}>
//                     <User className="h-4 w-4 mr-2" />
//                     Login
//                   </Button>
//                 </div>
//               )}
//             </nav>

//             {/* Mobile toggle */}
//             <button
//               aria-label="Toggle menu"
//               className="md:hidden p-2 rounded-md hover:bg-gray-100"
//               onClick={() => setOpen(!open)}
//             >
//               <svg
//                 className="h-6 w-6 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d={
//                     open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
//                   }
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Mobile Nav */}
//           {open && (
//             <nav className="md:hidden py-4 flex flex-col gap-3 text-sm">
//               <Link href="/about">About</Link>
//               <Link href="/research">Research</Link>
//               <Link href="/journal">Journal</Link>
//               <Link href="/publications">Publications</Link>
//               <Link href="/compliance">Compliance</Link>

//               {!user ? (
//                 <button
//                   onClick={() => {
//                     setLoginOpen(true);
//                     setOpen(false);
//                   }}
//                   className="text-left text-gray-700"
//                 >
//                   Login
//                 </button>
//               ) : (
//                 <button onClick={onLogout} className="text-left text-gray-700">
//                   Logout
//                 </button>
//               )}
//             </nav>
//           )}
//         </div>
//       </header>

//       {/* Login modal */}
//       <LoginModal
//   isOpen={loginOpen}
//   onClose={() => setLoginOpen(false)}
//   onLogin={(role) => {
//     console.log("logged in as", role);
//     // TODO: call auth API, update parent user state, or call a prop passed down to Navbar to set user
//     // e.g. props.onLogin?.(role) if you add onLogin to Navbar props
//   }}
// />
//     </>
//   );
// }



// // src/components/Header.tsx
// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { User, Shield } from "lucide-react";
// import { Button } from "@/src/components/ui/button";
// import { LoginModal } from "@/src/components/LoginModal"; // adjust path if needed

// interface HeaderProps {
//   user?: { name: string; role: string } | null;
//   onLogout?: () => void;
//   /**
//    * onLogin receives the payload from LoginModal.
//    * LoginModal calls onLogin(payload) where payload is { role, email, password }.
//    */
//   onLogin?: (payload: { role: string; email: string; password: string }) => void | Promise<void>;
// }

// export default function Header({ user, onLogout, onLogin }: HeaderProps) {
//   const [open, setOpen] = useState(false); // mobile nav open
//   const [loginOpen, setLoginOpen] = useState(false); // login modal open

//   return (
//     <>
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-2">
//               <Shield className="h-8 w-8 text-emerald-600" />
//               <div className="leading-tight">
//                 <span className="block text-lg font-bold text-gray-900">NCIR</span>
//                 <span className="block text-xs text-gray-500">
//                   National Cancer Imaging Repository
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Nav */}
//             <nav className="hidden md:flex items-center gap-6 text-sm">
//               <Link href="#about" className="text-gray-600 hover:text-gray-900">
//                 About
//               </Link>
//               <Link href="#research" className="text-gray-600 hover:text-gray-900">
//                 Research
//               </Link>
//               <Link href="/journal" className="text-gray-600 hover:text-gray-900">
//                 Journal
//               </Link>
//               <Link href="/publications" className="text-gray-600 hover:text-gray-900">
//                 Publications
//               </Link>
//               <Link href="#compliance" className="text-gray-600 hover:text-gray-900">
//                 Compliance
//               </Link>

//               {user ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-600">Hi, {user.name}</span>
//                   <Button size="sm" variant="secondary" onClick={onLogout}>
//                     Logout
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Button size="sm" onClick={() => setLoginOpen(true)}>
//                     <User className="h-4 w-4 mr-2" />
//                     Login
//                   </Button>
//                 </div>
//               )}
//             </nav>

//             {/* Mobile toggle */}
//             <button
//               aria-label="Toggle menu"
//               className="md:hidden p-2 rounded-md hover:bg-gray-100"
//               onClick={() => setOpen(!open)}
//             >
//               <svg
//                 className="h-6 w-6 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d={
//                     open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
//                   }
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Mobile Nav */}
//           {open && (
//             <nav className="md:hidden py-4 flex flex-col gap-3 text-sm">
//               <Link href="/about" className="text-gray-700">About</Link>
//               <Link href="/research" className="text-gray-700">Research</Link>
//               <Link href="/journal" className="text-gray-700">Journal</Link>
//               <Link href="/publications" className="text-gray-700">Publications</Link>
//               <Link href="/compliance" className="text-gray-700">Compliance</Link>

//               {!user ? (
//                 <button
//                   onClick={() => {
//                     setLoginOpen(true);
//                     setOpen(false);
//                   }}
//                   className="text-left text-gray-700"
//                 >
//                   Login
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     onLogout?.();
//                   }}
//                   className="text-left text-gray-700"
//                 >
//                   Logout
//                 </button>
//               )}
//             </nav>
//           )}
//         </div>
//       </header>

//       {/* Login modal — receives full payload from modal and forwards to onLogin prop */}
//       <LoginModal
//         isOpen={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         onLogin={async (payload: { role: string; email: string; password: string }) => {
//           // close the modal first for immediate UX feedback
//           setLoginOpen(false);

//           // if parent passed an onLogin handler, call it (e.g. to call your auth API or useAuth.login)
//           if (onLogin) {
//             await onLogin(payload);
//             return;
//           }

//           // otherwise, simple fallback: log to console (replace with real login logic)
//           // eslint-disable-next-line no-console
//           console.log("Login payload (no onLogin handler supplied):", payload);
//         }}
//       />
//     </>
//   );
// }




// src/components/layouts/Navbar.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { User, Shield } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { LoginModal } from "@/src/components/LoginModal";
import { useAuth } from "@/src/context/AuthProvider"; // optional: used if parent doesn't provide onLogin

interface HeaderProps {
  user?: { name: string; role: string } | null;
  onLogout?: () => void;
  /**
   * onLogin receives the payload from LoginModal.
   * LoginModal calls onLogin(payload) where payload is { role, email, password }.
   */
  onLogin?: (payload: { role: string; email: string; password: string }) => void | Promise<void>;
}

export default function Navbar({ user, onLogout, onLogin }: HeaderProps) {
  const [open, setOpen] = useState(false); // mobile nav open
  const [loginOpen, setLoginOpen] = useState(false); // login modal open

  // If parent doesn't handle login, try using the app's AuthProvider
  const auth = useAuth?.();

  // This handler matches LoginModal's payload signature.
  // It first closes the modal, then either forwards payload to parent onLogin
  // or falls back to calling auth.login(payload).
  const handleModalLogin = async (payload: { role: string; email: string; password: string }) => {
    setLoginOpen(false);

    try {
      if (onLogin) {
        await onLogin(payload);
        return;
      }

      // fallback to AuthProvider if available
      if (auth?.login) {
        await auth.login({ role: payload.role as any, email: payload.email, password: payload.password });
        return;
      }

      // nothing to do: log payload for debugging
      // eslint-disable-next-line no-console
      console.warn("No onLogin prop supplied and no auth.login available. Payload:", payload);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Login failed inside Navbar handler:", err);
      // Optionally rethrow or surface error UI; keeping simple for now.
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-emerald-600" />
              <div className="leading-tight">
                <span className="block text-lg font-bold text-gray-900">NCIR</span>
                <span className="block text-xs text-gray-500">
                  National Cancer Imaging Repository
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="#research" className="text-gray-600 hover:text-gray-900">
                Research
              </Link>
              <Link href="/journal" className="text-gray-600 hover:text-gray-900">
                Journal
              </Link>
              <Link href="/publications" className="text-gray-600 hover:text-gray-900">
                Publications
              </Link>
              <Link href="#compliance" className="text-gray-600 hover:text-gray-900">
                Compliance
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">Hi, {user.name}</span>
                  <Button size="sm" variant="secondary" onClick={onLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => setLoginOpen(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </div>
              )}
            </nav>

            {/* Mobile toggle */}
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(!open)}
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Nav */}
          {open && (
            <nav className="md:hidden py-4 flex flex-col gap-3 text-sm">
              <Link href="/about" className="text-gray-700">About</Link>
              <Link href="/research" className="text-gray-700">Research</Link>
              <Link href="/journal" className="text-gray-700">Journal</Link>
              <Link href="/publications" className="text-gray-700">Publications</Link>
              <Link href="/compliance" className="text-gray-700">Compliance</Link>

              {!user ? (
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setOpen(false);
                  }}
                  className="text-left text-gray-700"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    onLogout?.();
                  }}
                  className="text-left text-gray-700"
                >
                  Logout
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Login modal — receives full payload from modal and forwards to onLogin prop or auth.login */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleModalLogin}
      />
    </>
  );
}