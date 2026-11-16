export interface RegisterResponse {
  message: "success" | "Account Already Exists";
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}
export interface ForgotPasswordResponse {
  statusMsg: "success" | "fail";
  message: string;
}
export interface VerifyResetCodeResponse {
  status: string;
}
export interface ResetPasswordResponse {
  token: string;
}

export interface UserAddressResponse {
  status: string;
  message: string;
  data: Daum[];
}

export interface Daum {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
