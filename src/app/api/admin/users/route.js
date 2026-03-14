import { supabaseAdmin } from '../../../../../utils/supabaseAdmin';

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: callerProfile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!callerProfile || !['admin', 'principal'].includes(callerProfile.role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { data: users, error } = await supabaseAdmin
    .from('profiles')
    .select('id, email, first_name, last_name, role, status, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ users });
}
