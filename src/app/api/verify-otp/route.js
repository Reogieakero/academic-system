import { supabase } from '../../../../utils/supabaseClient';

export async function POST(request) {
  const { email, token } = await request.json();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
