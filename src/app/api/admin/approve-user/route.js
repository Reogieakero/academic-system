import { supabaseAdmin } from '../../../../../utils/supabaseAdmin';

export async function POST(request) {
  // Verify the caller is authenticated
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const { userId, action } = await request.json();

  if (!userId) {
    return Response.json({ error: 'userId is required' }, { status: 400 });
  }

  // Verify the access token and get the calling user
  const {
    data: { user },
    error: authError,
  } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Confirm the calling user has an admin or principal role
  const { data: callerProfile, error: callerError } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (callerError || !callerProfile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!['admin', 'principal'].includes(callerProfile.role)) {
    return Response.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 });
  }

  const newStatus = action === 'reject' ? 'rejected' : 'approved';

  const { error: updateError } = await supabaseAdmin
    .from('profiles')
    .update({ status: newStatus })
    .eq('id', userId);

  if (updateError) {
    return Response.json({ error: updateError.message }, { status: 500 });
  }

  return Response.json({ success: true, status: newStatus });
}
