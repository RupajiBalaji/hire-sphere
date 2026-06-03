import { getCurrentUser } from "@/lib/api/auth";

export type Profile = {
  name: string;
  email: string;
  role: "candidate" | "recruiter";
  headline: string;
  location: string;
  education: string;
  proofScore: number;
  skills: {
    name: string;
    value: number;
  }[];
};

export async function getProfile(): Promise<Profile> {
  const user = await getCurrentUser();

  return {
    name: user?.name ?? "Aanya Verma",
    email: user?.email ?? "you@school.edu",
    role: user?.role ?? "candidate",
    headline: "Frontend Developer · UI/UX Designer",
    location: "Hyderabad",
    education: "B.Tech ECE",
    proofScore: 860,
    skills: [
      { name: "React", value: 92 },
      { name: "Java", value: 85 },
      { name: "Figma", value: 88 },
      { name: "UI Design", value: 90 },
    ],
  };
}