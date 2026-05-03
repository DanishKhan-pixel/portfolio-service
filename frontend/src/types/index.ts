// ─── API Response Types ─────────────────────────────────────────

export interface Profile {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  years_of_experience: number;
  email: string;
  linkedin_url: string;
  github_url: string;
  resume_url: string;
  avatar_url: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Database' | 'Tools' | 'Other';
  category_display: string;
  proficiency_level: number;
  icon: string;
  order: number;
}

export interface ProjectSummary {
  id: number;
  name: string;
  slug: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  thumbnail_url: string;
  featured: boolean;
  order: number;
}

export interface ProjectDetail extends ProjectSummary {
  architecture_summary: string;
  key_features: string[];
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  description_bullets: string[];
  technologies_used: string[];
  company_url: string;
  is_current: boolean;
  duration: string;
  order: number;
}

export interface Certification {
  id: number;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string;
  credential_url: string;
  order: number;
}

export interface Education {
  id: number;
  institute_name: string;
  degree: string;
  field_of_study: string;
  start_year: number;
  end_year: number | null;
  description: string;
  grade: string;
  order: number;
}

// ─── Theme ──────────────────────────────────────────────────────

export type Theme = 'dark' | 'light';

// ─── Component Props ────────────────────────────────────────────

export interface SectionProps {
  id: string;
  className?: string;
}
