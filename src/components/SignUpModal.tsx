"use client";

import { useState } from "react";
import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";
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
import { useAuth } from "@/src/context/AuthProvider";

export interface SignUpPayload {
  account_type: string;
  email: string;
  password: string;
}

export interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp?: (payload: SignUpPayload) => void | Promise<void>;
}

export const SignUpModal = ({ isOpen, onClose, onSignUp }: SignUpModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);

  const auth = useAuth();
  const loading = auth.loading || localLoading;

  const handleSubmit = async () => {
    setError(null);

    if (!selectedRole || !email || !password) {
      setError("Please choose a role and enter email & password.");
      return;
    }

    const payload: SignUpPayload = {
      account_type: selectedRole,
      email,
      password,
    };

    setLocalLoading(true);
    try {
      if (onSignUp) {
        await onSignUp(payload);
      } else if (auth.register) {
        await auth.register({
          account_type: payload.account_type as any,
          email: payload.email,
          password: payload.password,
        });
      } else {
        throw new Error("No sign-up handler available.");
      }

      onClose();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Sign-up failed";
      setError(message);
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
            Create Your Account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value) => setSelectedRole(value)}
              value={selectedRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="super-admin" className="hover:bg-gray-200">
                  Super Admin (NCIR/Algorizmi)
                </SelectItem>
                <SelectItem value="contributor" className="hover:bg-gray-200">
                  Contributor (Hospital/Clinic)
                </SelectItem>
                <SelectItem value="annotator" className="hover:bg-gray-200">
                  Annotator (Medical Expert)
                </SelectItem>
                <SelectItem value="researcher" className="hover:bg-gray-200">
                  Researcher (Academic/Industry)
                </SelectItem>
                <SelectItem value="ethicsofficer" className="hover:bg-gray-200">
                  Ethics Officer (Audit)
                </SelectItem>
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
                onChange={(event) => setEmail(event.target.value)}
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
                placeholder="Create a strong password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
              All accounts undergo verification to ensure NDPR-compliant access.
            </p>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="medical"
              className="flex-1"
              disabled={!selectedRole || !email || !password || loading}
            >
              {loading ? "Creating account..." : "Sign up securely"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

