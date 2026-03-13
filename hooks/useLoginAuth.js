import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient';

export default function useLoginAuth() {
  const router = useRouter();

  const loginWithEmail = async ({ email, password }) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    await supabase.auth.setSession(data.session);
    router.push('/home');

    return data;
  };

  return { loginWithEmail };
}
