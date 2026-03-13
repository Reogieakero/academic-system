import { supabase } from '../../../../utils/supabaseClient';

export async function POST(request) {
  const { email, password, firstName, middleName, lastName, suffix } = await request.json();

  const origin = new URL(request.url).origin;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        suffix,
      },
      emailRedirectTo: `${origin}/login`,
    },
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
