export interface User {
  id?: number;
  uuid?: string;
  email: string;
  nickname: string;
  avatar_url: string;
  created_at?: string;
  updated_at?: string;
  locale?: string;
  signin_type?: string;
  signin_provider?: string;
  signin_openid?: string;
  signin_ip?: string;
  invite_code?: string;
  invited_by?: string;
  is_affiliate?: boolean;
}
