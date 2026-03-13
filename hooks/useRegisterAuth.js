import { useRouter } from 'next/navigation';

export default function useRegisterAuth() {
  const router = useRouter();

  const registerWithEmail = async (formData) => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim() || null,
        lastName: formData.lastName.trim(),
        suffix: formData.suffix || null,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  };

  const verifySignupCode = async ({ email, token }) => {
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verification failed');
    router.push('/login');
    return data;
  };

  return {
    registerWithEmail,
    verifySignupCode,
  };
}
