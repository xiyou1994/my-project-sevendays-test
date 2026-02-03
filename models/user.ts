import { supabase } from "./db";
import { User } from "@/types/user";

export async function insertUser(user: User): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select()
    .single();

  if (error) {
    console.error("Error inserting user:", error);
    throw error;
  }

  return data as User;
}

export async function findUserByEmail(email: string, provider?: string): Promise<User | null> {
  let query = supabase.from("users").select("*").eq("email", email);

  if (provider) {
    query = query.eq("signin_provider", provider);
  }

  const { data, error } = await query.single();

  if (error && error.code !== "PGRST116") {
    console.error("Error finding user by email:", error);
    return null;
  }

  return data as User | null;
}

export async function findUserByUuid(uuid: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uuid", uuid)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error finding user by uuid:", error);
    return null;
  }

  return data as User | null;
}

export async function updateUser(uuid: string, updates: Partial<User>): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("uuid", uuid)
    .select()
    .single();

  if (error) {
    console.error("Error updating user:", error);
    return null;
  }

  return data as User;
}
