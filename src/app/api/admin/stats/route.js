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

  const [
    { count: total },
    { count: pending },
    { count: approved },
  ] = await Promise.all([
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
  ]);

  return Response.json({ total, pending, approved });
}
