import { supabase } from '../../../../utils/supabaseClient';

export async function POST(request) {
  const { email, password, firstName, middleName, lastName, suffix } = await request.json();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        suffix,
      },
    },
  });

  if (error) {
    console.error('Supabase signUp error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
