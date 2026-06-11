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
  // Preserve both role AND name from a previous signup if the email matches
  let existingRole: UserRole = "candidate";
  let existingName: string | undefined = name?.trim();

  try {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      const existing = JSON.parse(stored) as User;
      if (existing.email?.trim().toLowerCase() === email.trim().toLowerCase()) {
        existingRole = existing.role ?? "candidate";
        // Keep the name from signup unless a new name was explicitly passed in
        if (!existingName && existing.name) {
          existingName = existing.name;
        }
      }
    }
  } catch {
    // ignore parse errors
  }

  const user: User = {
    email: email.trim(),
    name: existingName,
    role: existingRole,
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