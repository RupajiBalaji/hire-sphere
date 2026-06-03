import type { Task } from "@/components/TaskCard";

export type RecruiterTask = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: Task["difficulty"];
  deadline: string;
  status: "Live";
  createdAt: string;
};

export type Candidate = {
  name: string;
  school: string;
  rating: number;
  task: string;
  preview: string;
  tags: string[];
  note: string;
};

export type ShortlistedCandidate = {
  name: string;
  school: string;
  rating: number;
  task: string;
  shortlistedAt: string;
};

const RECRUITER_TASKS_KEY = "hiresphere_recruiter_tasks";
const SHORTLISTED_KEY = "hiresphere_shortlisted";

export async function publishRecruiterTask(
  task: Omit<RecruiterTask, "id" | "status" | "createdAt">,
): Promise<RecruiterTask> {
  const existing = getStoredRecruiterTasks();

  const newTask: RecruiterTask = {
    ...task,
    id: crypto.randomUUID(),
    status: "Live",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    RECRUITER_TASKS_KEY,
    JSON.stringify([...existing, newTask]),
  );

  return newTask;
}

export async function getRecruiterTasks(): Promise<RecruiterTask[]> {
  return getStoredRecruiterTasks();
}

export async function shortlistCandidate(
  candidate: Candidate,
): Promise<ShortlistedCandidate> {
  const existing = getStoredShortlistedCandidates();

  const alreadyShortlisted = existing.find(
    (item) => item.name === candidate.name,
  );

  if (alreadyShortlisted) {
    return alreadyShortlisted;
  }

  const shortlisted: ShortlistedCandidate = {
    name: candidate.name,
    school: candidate.school,
    rating: candidate.rating,
    task: candidate.task,
    shortlistedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    SHORTLISTED_KEY,
    JSON.stringify([...existing, shortlisted]),
  );

  return shortlisted;
}

export async function getShortlistedCandidates(): Promise<ShortlistedCandidate[]> {
  return getStoredShortlistedCandidates();
}

function getStoredRecruiterTasks(): RecruiterTask[] {
  const stored = localStorage.getItem(RECRUITER_TASKS_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as RecruiterTask[];
  } catch {
    return [];
  }
}

function getStoredShortlistedCandidates(): ShortlistedCandidate[] {
  const stored = localStorage.getItem(SHORTLISTED_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as ShortlistedCandidate[];
  } catch {
    return [];
  }
}