import { useState } from 'react';
import Link from 'next/link';
import AuthCard from '@/components/AuthCard';
import { supabase } from '@/lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/reset-password`
          : undefined,
    });
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <AuthCard
      title="Reset password"
      footer={<Link href="/auth/login" className="hover:text-gray-900">Back to sign in</Link>}
    >
      {sent ? (
        <p className="text-sm text-gray-600">
          If an account exists for <strong>{email}</strong>, a reset link has been sent.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-md border px-3 py-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 font-brand-medium text-white hover:bg-blue-700"
          >
            Send reset link
          </button>
        </form>
      )}
    </AuthCard>
  );
}
