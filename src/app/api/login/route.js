import { supabase } from '../../../../utils/supabaseClient';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';

export async function POST(request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('id, email, first_name, last_name, role, status')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profile) {
    return Response.json(
      { error: 'Profile not found. Please contact the administrator.' },
      { status: 403 }
    );
  }

  if (profile.status === 'pending') {
    return Response.json(
      { error: 'Your account is waiting for principal approval.' },
      { status: 403 }
    );
  }

  if (profile.status !== 'approved') {
    return Response.json(
      { error: 'Your account has been suspended. Please contact the administrator.' },
      { status: 403 }
    );
  }

  const redirectPath = ['admin', 'principal'].includes(profile.role) ? '/admin' : '/';

  return Response.json({
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    },
    user: {
      id: data.user.id,
      email: data.user.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      role: profile.role,
      status: profile.status,
    },
    redirectPath,
  });
}
