import { supabase } from '../../../../utils/supabaseClient';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';

export async function POST(request) {
  const { email, password, firstName, middleName, lastName, suffix } = await request.json();

  const origin = new URL(request.url).origin;

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
      emailRedirectTo: `${origin}/login`,
    },
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  if (data.user) {
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: data.user.id,
          email,
          first_name: firstName,
          middle_name: middleName || null,
          last_name: lastName,
          suffix: suffix || null,
          role: 'teacher',
          status: 'pending',
        },
        { onConflict: 'id' }
      );

    if (profileError) {
      console.error('Profile upsert error:', profileError.message);
    }
  }

  return Response.json({ success: true });
}
