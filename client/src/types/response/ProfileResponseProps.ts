export default interface ProfileResponse {
  success: boolean;
  user_login: string,
  user_avatar: string;
  user_email: string;
  message?: string;
  is_verified: boolean;
}
