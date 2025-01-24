type Program = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};
type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};
type User = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
};
type Material = {
  id: number;
  name: string;
  source_path: string;
  type: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  course_id: number;
};

export type { Program, Category, User, Material };
