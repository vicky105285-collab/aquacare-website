import bcrypt from "bcryptjs";

export interface CustomUserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "SUPER_ADMIN" | "ADMIN";
  createdAt: string;
}

// Persistent runtime buffer for custom admin users created in UI
const customUsersStore: CustomUserRecord[] = [];

// Global toggle to disable default master passwords like admin123
let masterPasswordDisabled = false;

export function getCustomUsers(): CustomUserRecord[] {
  return customUsersStore;
}

export async function addCustomUser(user: { name: string; email: string; passwordHash: string; role: "SUPER_ADMIN" | "ADMIN" }) {
  const cleanEmail = user.email.trim().toLowerCase();
  const existingIdx = customUsersStore.findIndex((u) => u.email === cleanEmail);
  
  const record: CustomUserRecord = {
    id: `custom-user-${Date.now()}`,
    name: user.name,
    email: cleanEmail,
    passwordHash: user.passwordHash,
    role: user.role,
    createdAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    customUsersStore[existingIdx] = record;
  } else {
    customUsersStore.push(record);
  }
  return record;
}

export function deleteCustomUser(idOrEmail: string): boolean {
  const initialLen = customUsersStore.length;
  const target = idOrEmail.trim().toLowerCase();
  const filtered = customUsersStore.filter((u) => u.id !== idOrEmail && u.email !== target);
  customUsersStore.length = 0;
  customUsersStore.push(...filtered);
  return customUsersStore.length < initialLen;
}

export async function verifyCustomUserLogin(email: string, password: string): Promise<CustomUserRecord | null> {
  const cleanEmail = email.trim().toLowerCase();
  const user = customUsersStore.find((u) => u.email === cleanEmail);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}

export function isMasterPasswordDisabled(): boolean {
  return masterPasswordDisabled;
}

export function setMasterPasswordDisabled(disabled: boolean) {
  masterPasswordDisabled = disabled;
}
