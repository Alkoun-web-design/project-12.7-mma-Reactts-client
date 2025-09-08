export interface UserForm {
  user_type: string; // "admin" | "tutor" | "counsellor";
  password?: string;
  email?: string;
  name?: string;
}

export interface User extends UserForm { 
  id: number;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface EducationalServiceForm {
  name: string;
  service_key: string;
  short_description: string;
  details: string;
  is_active: number;
}

export interface EducationalService extends EducationalServiceForm {
  id: number;
}

export interface StudentActivityForm { 
  name: string; 
  age_group: string; 
  description: string;
  image_url: string;
  is_active: number;
}

export interface StudentActivity extends StudentActivityForm { 
  id: number;
}
export interface CoachingAreaForm { 
  title: string; 
  description: string; 
  benefits: string;
  logo: string;
}

export interface CoachingArea extends CoachingAreaForm { 
  id: number;
}

export interface LanguageForm {
  name: string;
  code: string;
  is_active: boolean;
}

export interface Language extends LanguageForm {
  id: number;
}

export interface TestimonialForm {
  student_name: string;
  success_stories: string;
  testimonial: string;
  service_id: string;
}

export interface Testimonial extends TestimonialForm { 
  id: number;
}

export interface FaqForm {
  question: string;
  answer: string;
  category_name: string;
}

export interface Faq extends FaqForm {
  id: number;
}

export interface AdminForm {
  name: string;
  email: string;
  bio: string;
  education: string;
  languages: string;
  work_experience: string;
  certifications: string;
  achievements: string;
  avatar: File | null;
}

export interface Admin extends AdminForm{
  user_id: number;
  avatar_url: string | null;
}

export interface CounsellorForm {
  name: string;
  email: string;
  bio: string;
  education: string;
  languages: string;
  work_experience: string;
  certifications: string;
  achievements: string;
  avatar: File | null;
}
export interface CounsellorMember extends CounsellorForm {
  user_id: number;
  avatar_url: string | undefined;
}
export interface TutorForm {
  name: string;
  bio: string;
  education: string;
  subject_speciality: string;
  teaching_style: string;
  languages: string;
  work_experience: string;
  certifications: string;
  achievements: string;
  email: string;
  avatar: File | null;
}

export interface Tutor extends TutorForm {
  user_id: number;
  avatar_url: string | undefined;
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

export interface ScheduleForm {
  subject_id: number;
  tutor_id: number;
  timing: string;
  timeframe: string;
  description: string;
  status: string; //'Now Enrolling' | 'Starting Next Month' | 'Enrollment Closed'
}

export interface Schedule extends ScheduleForm { 
  id: number; 
}
export interface PricingForm { 
  name: string; 
  description: string; 
  price: string; 
  annual_price: string;
  annual_description: string;
  features: string; 
  popular: number;
  link_to: string;
  order_index: number;
  is_active: number;
}

export interface Pricing extends PricingForm {
  id: number;
}

export interface ServicePricingForm {
  service: string;
  individual: string;
  package: string;
  link_to: string;
  order_index: number;
  is_active: number;
}

export interface ServicePricing extends ServicePricingForm {
  id: number;
}

export interface AcademicResourceForm {  
  category_title: string; 
  description: string;
  icon: string; 
  features: string;
}

export interface AcademicResource extends AcademicResourceForm {
  id: number;
}

export interface TestPrepOptionForm {
  test: string;
  description: string;
  format: string;
  duration: string;
  features: string[];
  is_active: number;
}
export interface TestPrepOption extends TestPrepOptionForm {
  id: number;
}

export interface SubjectForm {
  name: string;
  level: string;
}

export interface Subject extends SubjectForm {
  id: number;
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