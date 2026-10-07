export interface Project {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  description?: string;
  tools?: string[];
}

export interface Service {
  number: string;
  name: string;
  description: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  service: string;
  message: string;
}
