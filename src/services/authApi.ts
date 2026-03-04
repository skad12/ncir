import { apiClient } from "../lib/apiClient";
import type { AccountType } from "../context/AuthProvider";
import { ENDPOINTS } from "../lib/endpoints";

export type SignUpPayload = {
  email: string;
  password: string;
  account_type: AccountType;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  account_type?: string;
  email?: string;
};

export type SignInResponse = {
  account_type?: string;
  email?: string;
  user?: {
    account_type?: string;
    email?: string;
  };
};

export async function signUp(
  payload: SignUpPayload,
): Promise<SignUpResponse> {
  const response = await apiClient.post<SignUpResponse>(
    ENDPOINTS.CUSTOM_USER.SIGN_UP,
    payload,
  );
  return response.data;
}

export async function signIn(
  payload: SignInPayload,
): Promise<SignInResponse> {
  const response = await apiClient.post<SignInResponse>(
    ENDPOINTS.CUSTOM_USER.SIGN_IN,
    payload,
  );
  return response.data;
}

