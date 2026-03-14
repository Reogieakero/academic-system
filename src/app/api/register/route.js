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

    if (error.code === 'over_email_send_rate_limit') {
      return Response.json(
        {
          error: 'Too many email requests. Please wait before requesting another verification code.',
          code: error.code,
          retryAfterSeconds: 60,
        },
        { status: 429 }
      );
    }

    return Response.json(
      {
        error: error.message,
        code: error.code || 'registration_failed',
      },
      { status: error.status || 400 }
    );
  }

  return Response.json({ success: true });
}
