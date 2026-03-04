export const ENDPOINTS = {
  CUSTOM_USER: {
    ALL: "/custom-user/all/",
    DELETE_ACCOUNT: (userId: string | number) =>
      `/custom-user/delete/user-account/${userId}/`,
    FORGOT_PASSWORD: "/custom-user/forgot-password/",
    GET_USER_DETAIL: (userId: string | number) =>
      `/custom-user/get-user-detail/${userId}/`,
    RESET_PASSWORD: "/custom-user/reset-password/",
    SIGN_IN: "/custom-user/sign-in/",
    SIGN_UP: "/custom-user/sign-up/",
  },
  CANCER_IMAGING: {
    LIST: "/cancer-imaging/cancer-imaging/",
    DETAIL: (id: string | number) =>
      `/cancer-imaging/cancer-imaging/${id}/`,
  },
} as const;

