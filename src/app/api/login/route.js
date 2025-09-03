import { createClient } from '@/utils/supabase/server'

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  return Response.json({ success: true });
}
