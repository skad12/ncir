// // src/components/LoginModal.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";
// import { Button } from "../components/ui/button";

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onLogin: (role: string) => void;
// }

// export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // close on Escape
//   useEffect(() => {
//     function onKey(e: KeyboardEvent) {
//       if (e.key === "Escape") onClose();
//     }
//     if (isOpen) {
//       document.addEventListener("keydown", onKey);
//     } else {
//       document.removeEventListener("keydown", onKey);
//     }
//     return () => document.removeEventListener("keydown", onKey);
//   }, [isOpen, onClose]);

//   const handleLogin = () => {
//     if (selectedRole && email && password) {
//       onLogin(selectedRole);
//       // clear fields a bit for UX
//       setEmail("");
//       setPassword("");
//       setSelectedRole("");
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       aria-modal="true"
//       role="dialog"
//     >
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black/60"
//         onClick={onClose}
//         aria-hidden
//       />

//       {/* Modal panel */}
//       <div className="relative z-10 w-full max-w-md mx-4">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
//             <Shield className="h-5 w-5 text-emerald-600" />
//             <h3 className="text-lg font-semibold text-gray-900">
//               Secure Access to NCIR
//             </h3>
//           </div>

//           <div className="p-6 space-y-4">
//             {/* Role */}
//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
//                 Access Role
//               </label>
//               <select
//                 id="role"
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//                 className="w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
//               >
//                 <option value="">Select your role</option>
//                 <option value="super-admin">Super Admin (NCIR/Algorizmi)</option>
//                 <option value="contributor">Contributor (Hospital/Clinic)</option>
//                 <option value="annotator">Annotator (Medical Expert)</option>
//                 <option value="researcher">Researcher (Academic/Industry)</option>
//                 <option value="ethics-officer">Ethics Officer (Audit)</option>
//               </select>
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="your.email@institution.ng"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full rounded-md border border-gray-200 pl-10 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full rounded-md border border-gray-200 pl-10 pr-12 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((s) => !s)}
//                   className="absolute right-1 top-1 h-8 px-2 inline-flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Info */}
//             <div className="bg-gray-50 p-3 rounded-md">
//               <p className="text-xs text-gray-600 flex items-center gap-2">
//                 <Shield className="h-3 w-3 text-emerald-600" />
//                 This system uses 2FA and maintains full audit logs for compliance
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3 pt-2">
//               <Button variant="outline" onClick={onClose} className="flex-1">
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleLogin}
//                 variant="medical"
//                 className="flex-1"
//                 disabled={!selectedRole || !email || !password}
//               >
//                 Secure Login
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



"use client"

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: string) => void;
}

export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (selectedRole && email && password) {
      onLogin(selectedRole);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Secure Access to NCIR
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2  ">
            <Label htmlFor="role">Access Role</Label>
            <Select onValueChange={setSelectedRole} >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="super-admin">Super Admin (NCIR/Algorizmi)</SelectItem>
                <SelectItem value="contributor">Contributor (Hospital/Clinic)</SelectItem>
                <SelectItem value="annotator">Annotator (Medical Expert)</SelectItem>
                <SelectItem value="researcher">Researcher (Academic/Industry)</SelectItem>
                <SelectItem value="ethics-officer">Ethics Officer (Audit)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@institution.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-200 focus:ring-2 focus:ring-emerald-500 "
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 border-gray-200"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-xs text-gray-500 ">
              <Shield className="h-3 w-3 inline mr-1" />
              This system uses 2FA and maintains full audit logs for compliance
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleLogin} 
              variant="medical" 
              className="flex-1"
              disabled={!selectedRole || !email || !password}
            >
              Secure Login
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};