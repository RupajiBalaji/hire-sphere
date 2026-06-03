import type { Task } from "@/components/TaskCard";
import { tasks as seedTasks } from "@/lib/mock-data";

export type Submission = {
  taskId: string;
  taskTitle: string;
  company: string;
  status: "Under review";
  submittedAt: string;
};

const TASKS_KEY = "hiresphere_tasks";
const SUBMISSIONS_KEY = "hiresphere_submissions";

export async function getTasks(): Promise<Task[]> {
  const stored = localStorage.getItem(TASKS_KEY);

  if (!stored) {
    return seedTasks;
  }

  try {
    return JSON.parse(stored) as Task[];
  } catch {
    return seedTasks;
  }
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  const tasks = await getTasks();
  return tasks.find((task) => task.id === id);
}

export async function submitTaskSolution(task: Task): Promise<Submission> {
  const existing = getStoredSubmissions();

  const alreadySubmitted = existing.find(
    (submission) => submission.taskId === task.id,
  );

  if (alreadySubmitted) {
    return alreadySubmitted;
  }

  const submission: Submission = {
    taskId: task.id,
    taskTitle: task.title,
    company: task.company,
    status: "Under review",
    submittedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    SUBMISSIONS_KEY,
    JSON.stringify([...existing, submission]),
  );

  return submission;
}

export async function hasSubmittedTask(taskId: string): Promise<boolean> {
  return getStoredSubmissions().some(
    (submission) => submission.taskId === taskId,
  );
}

export async function getSubmissions(): Promise<Submission[]> {
  return getStoredSubmissions();
}

function getStoredSubmissions(): Submission[] {
  const stored = localStorage.getItem(SUBMISSIONS_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Submission[];
  } catch {
    return [];
  }
}