export interface User {
  id: number;
  userType: string;
  email?: string;
  name?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface CoachingArea {
  id: number;
  title: string;
  description: string;
  benefits: string[];
  logo: string | null;
}

export interface Testimonial {
  id: number;
  student_name: string;
  testimonial: string;
  success_stories?: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  bio: string;
  education: string | null;
  languages: string | null;
  work_experience: string | null;
  certifications: string | null;
  achievements: string | null;
  avatar_url: string | null;
}
export interface Tutor {
  id: number;
  name: string;
  email: string;
  subject_speciality: string | null;
  bio: string;
  education: string | null;
  teaching_style: string | null;
  languages: string | null;
  work_experience: string | null;
  certifications: string | null;
  achievements: string | null;
  avatar_url: string | null;
}

export interface Counsellor {
  id: number;
  name: string;
  email: string;
  bio: string;
  education: string | null;
  languages: string | null;
  work_experience: string | null;
  certifications: string | null;
  achievements: string | null;
  avatar_url: string | null;
}

export interface StaffForm { 
  name: string; 
  email: string;
  bio: string; 
  education: string; 
  languages: string; 
  work_experience: string; 
  certifications: string; 
  achievements: string; 
  avatar: File | null;
};



// export interface User { 
//   id: number;  
//   email: string; 
//   password?: string;
//   user_type: "admin" | "tutor" | "counsellor";
// }

export interface Schedule { 
  id: number; 
  subject_id: number;
  tutor_id: number;
  timing: string; 
  timeframe: string;
  description: string;
  status: "Now Enrolling" | "Starting Next Month" | "Enrollment Closed";
}

export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  linkTo: string;
  annualPrice?: string;
  annualDescription?: string;
}

export interface ServicePricing {
  id: number;
  service: string;
  description: string;
  individual: string;
  package: string;
  linkTo: string;
}

export interface TestPrepOption {
  id: number;
  test: string;
  description: string;
  format: string;
  duration: string;
  features: string[];
  is_active: boolean;
}

export interface Subject { 
    id: number; 
    name: string; 
    level: string; 
}

export interface Details{
  icon: string;
  heading:  string;
  description: string;
}

export interface Content {
  main_title?: string;
  main_subtitle?: string;
  main_background_image?: string;
  second_title?: string | null;
  second_subtitle?: string | null;
  second_details?: Details[] | null;
  third_title?: string | null;
  third_subtitle?: string;
  third_details?: Details[] | null;
  fourth_title?: string | null;
  fourth_subtitle?: string | null;
  fourth_details?: Details[] | null;
  fifth_title?: string | null;
  fifth_subtitle?: string | null;
  fifth_details?: Details[] | null;
  sixth_title?: string | null;
  sixth_subtitle?: string | null;
  sixth_details?: Details[] | null;
  seventh_title?: string | null;
  seventh_subtitle?: string | null;
  seventh_details?: Details[] | null;
  eighth_title?: string | null;
  eighth_subtitle?: string | null;
  eighth_details?: Details[] | null;
  ninth_title?: string | null;
  ninth_subtitle?: string | null;
  ninth_details?: Details[] | null;
  tenth_title?: string | null;
  tenth_subtitle?: string | null;
  tenth_details?: Details[] | null;
  left_column_title?: string | null;
  left_column_subtitle?: string | null;
  left_column_logo?: string | null;
  center_column_title?: string | null;
  right_column_title?: string | null;
}