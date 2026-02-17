
// // src/components/LoginModal.tsx
// "use client";

// import { useState } from "react";
// import { Button } from "@/src/components/ui/button";
// import { Input } from "@/src/components/ui/input";
// import { Label } from "@/src/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/src/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/src/components/ui/select";
// import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";
// import { useAuth } from "@/src/context/AuthProvider";

// export interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   /**
//    * Called when login succeeds. Parent page expects the role string so it can
//    * set local state / redirect / show different UI.
//    */
//   onLogin: (role: string) => void;
// }

// export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const { login, loading } = useAuth();

//   const handleLogin = async () => {
//     setError(null);
//     if (!selectedRole || !email || !password) {
//       setError("Please choose a role and enter email & password.");
//       return;
//     }

//     try {
//       await login({ role: selectedRole as any, email, password });
//       // Notify parent about successful login and role selected
//       try {
//         onLogin(selectedRole);
//       } catch (e) {
//         // swallow if parent doesn't need it, but it should.
//         console.warn("onLogin handler threw:", e);
//       }

//       // close local modal (parent page may also close it in its handler)
//       onClose();
//     } catch (err: any) {
//       setError(err?.message || "Login failed");
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md bg-white">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Shield className="h-5 w-5 text-green-500" />
//             Secure Access to NCIR
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="role">Access Role</Label>
//             <Select onValueChange={(v) => setSelectedRole(v)} value={selectedRole}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select your role" />
//               </SelectTrigger>
//               <SelectContent className="bg-white border-gray-200">
//                 <SelectItem value="super-admin">Super Admin (NCIR/Algorizmi)</SelectItem>
//                 <SelectItem value="contributor">Contributor (Hospital/Clinic)</SelectItem>
//                 <SelectItem value="annotator">Annotator (Medical Expert)</SelectItem>
//                 <SelectItem value="researcher">Researcher (Academic/Industry)</SelectItem>
//                 <SelectItem value="ethicsofficer">Ethics Officer (Audit)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email Address</Label>
//             <div className="relative">
//               <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@institution.ng"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10 border-gray-200 focus:ring-2 focus:ring-emerald-500 "
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10 pr-10 border-gray-200 focus:ring-2 focus:ring-emerald-500"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-4 w-4 text-gray-500" />
//                 ) : (
//                   <Eye className="h-4 w-4 text-gray-500" />
//                 )}
//               </Button>
//             </div>
//           </div>

//           <div className="bg-muted p-3 rounded-md">
//             <p className="text-xs text-gray-500">
//               <Shield className="h-3 w-3 inline mr-1" />
//               This system uses 2FA and maintains full audit logs for compliance
//             </p>
//           </div>

//           {error && (
//             <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
//               {error}
//             </div>
//           )}

//           <div className="flex gap-3 pt-4">
//             <Button variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleLogin}
//               variant="medical"
//               className="flex-1"
//               disabled={!selectedRole || !email || !password || loading}
//             >
//               {loading ? "Signing in..." : "Secure Login"}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };


// src/components/LoginModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/src/context/AuthProvider";

export interface LoginPayload {
  role: string;
  email: string;
  password: string;
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * Optional: receives the full credential payload.
   * If provided, this will be awaited. If not provided, the modal will
   * fall back to calling useAuth().login(payload) if available.
   */
  onLogin?: (payload: LoginPayload) => void | Promise<void>;
}

export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);

  const auth = useAuth(); // may be undefined depending on your provider implementation
  const loading = auth?.loading ?? localLoading;

  const handleSubmit = async () => {
    setError(null);

    if (!selectedRole || !email || !password) {
      setError("Please choose a role and enter email & password.");
      return;
    }

    const payload: LoginPayload = {
      role: selectedRole,
      email,
      password,
    };

    setLocalLoading(true);
    try {
      if (onLogin) {
        // let parent handle the auth (page or navbar)
        await onLogin(payload);
      } else if (auth?.login) {
        // fallback to AuthProvider's login if available
        await auth.login({ role: payload.role as any, email: payload.email, password: payload.password });
      } else {
        // no handler available — surface a helpful error
        throw new Error("No login handler available.");
      }

      // success -> close modal
      onClose();
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Secure Access to NCIR
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Access Role</Label>
            <Select onValueChange={(v) => setSelectedRole(v)} value={selectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="super-admin">Super Admin (NCIR/Algorizmi)</SelectItem>
                <SelectItem value="contributor">Contributor (Hospital/Clinic)</SelectItem>
                <SelectItem value="annotator">Annotator (Medical Expert)</SelectItem>
                <SelectItem value="researcher">Researcher (Academic/Industry)</SelectItem>
                <SelectItem value="ethicsofficer">Ethics Officer (Audit)</SelectItem>
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
                className="pl-10 pr-10 border-gray-200 focus:ring-2 focus:ring-emerald-500"
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

          <div className="bg-muted p-3 rounded-md">
            <p className="text-xs text-gray-500">
              <Shield className="h-3 w-3 inline mr-1" />
              This system uses 2FA and maintains full audit logs for compliance
            </p>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="medical"
              className="flex-1"
              disabled={!selectedRole || !email || !password || loading}
            >
              {loading ? "Signing in..." : "Secure Login"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};