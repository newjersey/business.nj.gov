export interface UserData {
  user: BusinessUser;
  onboardingData: OnboardingData;
  formProgress: FormProgress;
  taskProgress: Record<string, TaskProgress>;
}

export type FormProgress = "UNSTARTED" | "COMPLETED";
export type TaskProgress = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const createEmptyUserData = (user: BusinessUser): UserData => {
  return {
    user: user,
    onboardingData: createEmptyOnboardingData(),
    formProgress: "UNSTARTED",
    taskProgress: {},
  };
};

export const createEmptyOnboardingData = (): OnboardingData => {
  return {
    businessName: "",
    industry: undefined,
    legalStructure: undefined,
    municipality: undefined,
    liquorLicense: false,
  };
};

export interface OnboardingData {
  businessName: string;
  industry: Industry | undefined;
  legalStructure: LegalStructure | undefined;
  municipality: Municipality | undefined;
  liquorLicense: boolean;
}

export type OnboardingDisplayContent = {
  businessName: {
    contentMd: string;
    placeholder: string;
  };
  industry: {
    contentMd: string;
    placeholder: string;
    infoAlertMd: string;
    specificHomeContractorMd: string;
    specificLiquorQuestion: {
      contentMd: string;
      radioButtonYesText: string;
      radioButtonNoText: string;
    };
  };
  legalStructure: {
    contentMd: string;
    optionContent: Record<LegalStructure, string>;
  };
  municipality: {
    contentMd: string;
    placeholder: string;
  };
};

export const createEmptyOnboardingDisplayContent = (): OnboardingDisplayContent => {
  return {
    businessName: {
      contentMd: "",
      placeholder: "",
    },
    industry: {
      contentMd: "",
      placeholder: "",
      infoAlertMd: "",
      specificHomeContractorMd: "",
      specificLiquorQuestion: {
        contentMd: "",
        radioButtonYesText: "",
        radioButtonNoText: "",
      },
    },
    legalStructure: {
      contentMd: "",
      optionContent: {
        "sole-proprietorship": "",
        "general-partnership": "",
        "limited-partnership": "",
        "limited-liability-partnership": "",
        "limited-liability-company": "",
        "c-corporation": "",
        "s-corporation": "",
        "b-corporation": "",
      },
    },
    municipality: {
      contentMd: "",
      placeholder: "",
    },
  };
};

export type RoadmapDisplayContent = {
  contentMd: string;
};

export type Municipality = {
  name: string;
  displayName: string;
  county: string;
  id: string;
};

export type MunicipalityDetail = {
  id: string;
  townName: string;
  townDisplayName: string;
  townWebsite: string;
  countyId: string;
  countyName: string;
  countyClerkPhone: string;
  countyClerkWebsite: string;
  countyWebsite: string;
};

export interface Roadmap {
  type: Industry;
  steps: Step[];
}

export interface RoadmapBuilder {
  steps: StepBuilder[];
}

export interface StepBuilder {
  step_number: number;
  id: string;
  name: string;
  timeEstimate: string;
  description: string;
  tasks: TaskBuilder[];
}

export interface TaskBuilder {
  id: string;
  weight: number;
}

export interface GenericStep {
  step_number: number;
  id: string;
  name: string;
  timeEstimate: string;
  description: string;
}

export interface AddOn {
  step: string;
  weight: number;
  task: string;
}

export interface TaskModification {
  step: string;
  taskToReplace: string;
  replaceWith: string;
}

export interface Step {
  step_number: number;
  id: string;
  name: string;
  timeEstimate: string;
  description: string;
  tasks: Task[];
}

export interface TaskOverview {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  callToActionLink: string;
  callToActionText: string;
  contentMd: string;
}

export type Industry = "restaurant" | "e-commerce" | "home-contractor" | "cosmetology" | "generic";

export type LegalStructure =
  | "sole-proprietorship"
  | "general-partnership"
  | "limited-partnership"
  | "limited-liability-partnership"
  | "limited-liability-company"
  | "c-corporation"
  | "s-corporation"
  | "b-corporation";

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
