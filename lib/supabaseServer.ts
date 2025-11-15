import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 🟢 Supabase server client (untuk Next.js App Router)
export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,

    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // tidak bisa set cookie di environment tertentu
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // tidak bisa hapus cookie di environment tertentu
          }
        },
      },
    }
  );
}
