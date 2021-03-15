import { BusinessForm, ECommerce, HomeImprovementContractor, Restaurant } from "./form";

export interface UserData {
  user: BusinessUser;
  formData: BusinessForm;
  formProgress: FormProgress;
}

export type FormProgress = "UNSTARTED" | "COMPLETED";

export const createEmptyUserData = (user: BusinessUser): UserData => {
  return {
    user: user,
    formData: {
      user: {
        email: user.email,
      },
    },
    formProgress: "UNSTARTED",
  };
};

export type BusinessType = Restaurant | ECommerce | HomeImprovementContractor;

export interface RoadmapFromFile {
  type: BusinessType;
  steps: StepFromFile[];
}
export interface StepFromFile {
  step_number: number;
  id: string;
  name: string;
  timeEstimate: string;
  description: string;
  tasks: string[];
}

export interface Roadmap {
  type: BusinessType;
  steps: Step[];
}

export interface Step {
  step_number: number;
  id: string;
  name: string;
  timeEstimate: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  task_number: number;
  id: string;
  name: string;
  description: string;
  destination: Destination;
  to_complete_must_have: string[];
  after_completing_will_have: string[];
}
export interface Destination {
  name: string;
  link: string;
}

export type LegalStructure =
  | "Sole Proprietorship"
  | "General Partnership"
  | "Limited Partnership (LP)"
  | "Limited Liability Partnership (LLP)"
  | "Limited Liability Company (LLC)"
  | "C-Corporation"
  | "S-Corporation"
  | "B-Corporation";

export const ALL_LEGAL_STRUCTURES: LegalStructure[] = [
  "Sole Proprietorship",
  "General Partnership",
  "Limited Partnership (LP)",
  "Limited Liability Partnership (LLP)",
  "Limited Liability Company (LLC)",
  "C-Corporation",
  "S-Corporation",
  "B-Corporation",
];

export type BusinessUser = {
  name?: string;
  email: string;
  id: string;
};

export interface SessionHelper {
  getCurrentToken: () => Promise<string>;
  getCurrentUser: () => Promise<BusinessUser>;
}

export interface AuthenticationHelper {
  onSignIn: () => Promise<void>;
  onSignOut: () => void;
}