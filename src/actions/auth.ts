"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

interface signUpPayload {
  name: string;
  email: string;
  password: string;
}
interface loginPayload{
    email: string,
    password:string
}

export async function signUp(req: signUpPayload) {
const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: req.email,
    password: req.password,
    options: {
      data: {
        name: req.name,
      },
    },
  });

  revalidatePath("/", "layout");

  return { data, error };
}

export async function login(req:loginPayload){
    const supabase =await createClient();
    const {data , error}= await supabase.auth.signInWithPassword(req);
    revalidatePath("/", "layout");
     return { data, error };

}

export async function logout(){
    const supabase= await createClient();

    const {error}= await supabase.auth.signOut();

    if(error){
        toast(error.message);
        redirect("/error");
    }
    revalidatePath("/", "layout");
    redirect('/login')
}
