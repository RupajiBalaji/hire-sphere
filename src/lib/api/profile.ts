import { getCurrentUser } from "@/lib/api/auth";

export type WorkExperience = {
  id: string;
  title: string;
  company: string;
  type: string; // Full-time, Part-time, Freelance, Internship
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
  activities: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issueMonth: string;
  issueYear: string;
  credentialUrl: string;
};

export type FullProfile = {
  name: string;
  email: string;
  role: "candidate" | "recruiter";
  headline: string;
  location: string;
  bio: string;
  avatar: string; // initials fallback key or uploaded data URL
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  openToWork: boolean;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  company?: string;
  title?: string;
};

const PROFILE_KEY = "hiresphere_full_profile";
const RECRUITER_PROFILE_KEY = "hiresphere_recruiter_profile";

const DEFAULT_PROFILE: Omit<FullProfile, "name" | "email" | "role"> = {
  headline: "",
  location: "",
  bio: "",
  avatar: "",
  website: "",
  github: "",
  linkedin: "",
  twitter: "",
  openToWork: false,
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  company: "",
  title: "",
};

async function readProfile(
  storageKey: string,
  role: FullProfile["role"],
): Promise<FullProfile> {
  const user = await getCurrentUser();
  const stored = localStorage.getItem(storageKey);

  const base: FullProfile = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    role,
    ...DEFAULT_PROFILE,
  };

  if (!stored) return base;

  try {
    const saved = JSON.parse(stored) as Partial<FullProfile>;
    return { ...base, ...saved, role };
  } catch {
    return base;
  }
}

export async function getFullProfile(): Promise<FullProfile> {
  return readProfile(PROFILE_KEY, "candidate");
}

export async function saveFullProfile(profile: Partial<FullProfile>): Promise<FullProfile> {
  const current = await getFullProfile();
  const updated = { ...current, ...profile, role: "candidate" as const };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  return updated;
}

export async function getRecruiterProfile(): Promise<FullProfile> {
  return readProfile(RECRUITER_PROFILE_KEY, "recruiter");
}

export async function saveRecruiterProfile(profile: Partial<FullProfile>): Promise<FullProfile> {
  const current = await getRecruiterProfile();
  const updated = { ...current, ...profile, role: "recruiter" as const };
  localStorage.setItem(RECRUITER_PROFILE_KEY, JSON.stringify(updated));
  return updated;
}

export function calcProfileStrength(p: FullProfile): number {
  let score = 0;
  if (p.name) score += 10;
  if (p.headline) score += 10;
  if (p.bio && p.bio.length > 30) score += 15;
  if (p.location) score += 5;
  if (p.skills.length >= 3) score += 10;
  if (p.skills.length >= 6) score += 5;
  if (p.experience.length >= 1) score += 15;
  if (p.education.length >= 1) score += 10;
  if (p.projects.length >= 1) score += 10;
  if (p.certifications.length >= 1) score += 5;
  if (p.github || p.linkedin || p.website) score += 5;
  return Math.min(score, 100);
}
