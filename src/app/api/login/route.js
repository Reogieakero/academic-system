import { supabase } from '../../../../utils/supabaseClient';

export async function POST(request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    },
  });
}
