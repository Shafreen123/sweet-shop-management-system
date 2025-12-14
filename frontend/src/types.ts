export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}