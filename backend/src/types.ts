export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}