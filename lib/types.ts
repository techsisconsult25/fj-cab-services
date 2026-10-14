export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tag: string | null;
  capacity: number;
  luggage: number;
  drive_type: string;
  insurance: string;
  coverage_area: string;
  features: string[];
  daily_rate: number;
  weekly_rate: number;
  image_url: string;
  description: string | null;
  featured: boolean;
  published: boolean;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  vehicle: string | null;
  message: string;
  created_at: string;
};
