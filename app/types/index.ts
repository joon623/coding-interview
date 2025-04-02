export type User = {
  id: string;
  email: string;
  name: string;
  role: 'INTERVIEWER' | 'INTERVIEWEE';
  skills: string[];
  experience: number;
};

export type Interview = {
  id: string;
  date: Date;
  status: 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED';
  interviewerId: string;
  intervieweeId: string;
  feedback?: string;
  rating?: number;
};

export type InterviewPost = {
  id: string;
  title: string;
  description: string;
  interviewer: User;
  requiredSkills: string[];
  experienceLevel: 'JUNIOR' | 'MIDLEVEL' | 'SENIOR';
  dateRange: {
    start: string;
    end: string;
  };
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
};

export type InterviewQuestion = {
  id: string;
  category: 'FE' | 'BE' | 'DevOps';
  subCategory: string;
  question: string;
  answer: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  tags: string[];
  likes: number;
  views: number;
}; 