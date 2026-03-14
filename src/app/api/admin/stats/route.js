import { supabaseAdmin } from '../../../../../utils/supabaseAdmin';

async function getVerifiedAuthUserIds() {
  const verifiedIds = new Set();
  const perPage = 1000;
  let page = 1;

  while (true) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw error;
    }

    const users = data?.users || [];
    users.forEach((authUser) => {
      if (authUser.email_confirmed_at) {
        verifiedIds.add(authUser.id);
      }
    });

    if (users.length < perPage) {
      break;
    }

    page += 1;
  }

  return Array.from(verifiedIds);
}

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

  let verifiedAuthUserIds = [];
  try {
    verifiedAuthUserIds = await getVerifiedAuthUserIds();
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (verifiedAuthUserIds.length === 0) {
    return Response.json({ total: 0, pending: 0, approved: 0 });
  }

  const { data: profiles, error: profilesError } = await supabaseAdmin
    .from('profiles')
    .select('status')
    .in('id', verifiedAuthUserIds);

  if (profilesError) {
    return Response.json({ error: profilesError.message }, { status: 500 });
  }

  const total = profiles?.length || 0;
  const pending = (profiles || []).filter((profile) => profile.status === 'pending').length;
  const approved = (profiles || []).filter((profile) => profile.status === 'approved').length;

  return Response.json({ total, pending, approved });
}
