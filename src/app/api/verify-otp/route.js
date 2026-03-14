import { supabase } from '../../../../utils/supabaseClient';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';

export async function POST(request) {
  const { email, token } = await request.json();

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  if (!data?.user?.id) {
    return Response.json({ error: 'Verification succeeded but user data is missing.' }, { status: 500 });
  }

  if (!data.user.email_confirmed_at) {
    return Response.json({ error: 'Email is not confirmed yet.' }, { status: 400 });
  }

  const metadata = data.user.user_metadata || {};
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert(
      {
        id: data.user.id,
        email: data.user.email,
        first_name: metadata.first_name || null,
        middle_name: metadata.middle_name || null,
        last_name: metadata.last_name || null,
        suffix: metadata.suffix || null,
        role: 'teacher',
        status: 'pending',
      },
      { onConflict: 'id' }
    );

  if (profileError) {
    return Response.json({ error: profileError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
