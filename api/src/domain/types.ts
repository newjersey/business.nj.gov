export interface UserDataClient {
  get: (userId: string) => Promise<UserData>;
  put: (userData: UserData) => Promise<UserData>;
}

export interface BusinessNameRepo {
  search: (name: string) => Promise<string[]>;
  save: (name: string) => Promise<void>;
  disconnect: () => Promise<void>;
  deleteAll: () => Promise<void>;
}

export interface LicenseStatusClient {
  search: (name: string, zipCode: string, licenseType: string) => Promise<LicenseEntity[]>;
}

export type SearchBusinessName = (name: string) => Promise<NameAvailability>;
export type SearchLicenseStatus = (nameAndAddress: LicenseSearchCriteria) => Promise<LicenseStatusResult>;

export interface UserHandler {
  get: (userId: string) => Promise<UserData>;
  put: (userData: UserData) => Promise<UserData>;
  update: (userId: string, update: Partial<UserData>) => Promise<UserData>;
}

export type NameAndAddress = {
  name: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
};

export interface LicenseSearchData {
  nameAndAddress: NameAndAddress;
  completedSearch: boolean;
}

export type LicenseSearchCriteria = {
  name: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  licenseType: string;
};

export type LicenseStatusResult = {
  status: LicenseStatus;
  checklistItems: LicenseStatusItem[];
};

export type LicenseStatusItem = {
  title: string;
  status: LicenseStatus;
};

export type LicenseEntity = {
  fullName: string;
  addressLine1: string;
  addressCity: string;
  addressState: string;
  addressCounty: string;
  addressZipCode: string;
  professionName: string;
  licenseType: string;
  applicationNumber: string;
  licenseNumber: string;
  licenseStatus: "Active" | "Pending" | "Expired";
  issueDate: string;
  expirationDate: string;
  checklistItem: string;
  checkoffStatus: "Completed" | "Unchecked" | "Not Applicable";
};

export type LicenseStatus = "ACTIVE" | "PENDING";

export type NameAvailability = {
  status: "AVAILABLE" | "UNAVAILABLE";
  similarNames: string[];
};

export type TaskProgress = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface UserData {
  user: BusinessUser;
  onboardingData: OnboardingData;
  formProgress: FormProgress;
  taskProgress: Record<string, TaskProgress>;
  licenseSearchData: LicenseSearchData | undefined;
}

export interface OnboardingData {
  businessName: string;
  industry: Industry | undefined;
  legalStructure: LegalStructure | undefined;
  municipality: Municipality | undefined;
  liquorLicense: boolean;
  homeBasedBusiness: boolean;
}

export type Municipality = {
  name: string;
  displayName: string;
  county: string;
  id: string;
};

export type FormProgress = "UNSTARTED" | "COMPLETED";

export type BusinessUser = {
  name?: string;
  email: string;
  id: string;
};

export type Industry = "restaurant" | "e-commerce" | "home-contractor" | "cosmetology" | "generic";
export const ALL_INDUSTRIES: Industry[] = [
  "restaurant",
  "e-commerce",
  "home-contractor",
  "cosmetology",
  "generic",
];

export type LegalStructure =
  | "sole-proprietorship"
  | "general-partnership"
  | "limited-partnership"
  | "limited-liability-partnership"
  | "limited-liability-company"
  | "c-corporation"
  | "s-corporation";

export const ALL_LEGAL_STRUCTURES: LegalStructure[] = [
  "sole-proprietorship",
  "general-partnership",
  "limited-partnership",
  "limited-liability-partnership",
  "limited-liability-company",
  "c-corporation",
  "s-corporation",
];
