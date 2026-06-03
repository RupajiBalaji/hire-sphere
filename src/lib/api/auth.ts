export type UserRole = "candidate" | "recruiter";

export type User = {
  name?: string;
  email: string;
  role: UserRole;
  loggedIn: true;
  rememberMe?: boolean;
  createdAt?: string;
  loggedInAt?: string;
};

const USER_KEY = "hiresphere_user";

export async function loginUser(
  email: string,
  rememberMe: boolean,
  name?: string,
): Promise<User> {
  const user: User = {
    email: email.trim(),
    name: name?.trim(),
    role: "candidate",
    loggedIn: true,
    rememberMe,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function signupUser(
  name: string,
  email: string,
  role: UserRole,
): Promise<User> {
  const user: User = {
    name: name.trim(),
    email: email.trim(),
    role,
    loggedIn: true,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  const stored = localStorage.getItem(USER_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem(USER_KEY);
}