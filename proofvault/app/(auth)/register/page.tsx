import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';
import RegisterForm from '@/components/auth/register-form';

export default async function RegisterPage() {
  // Check if user is already authenticated
  const cookieStore = cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/(dashboard)');
  }

  return (
    <div className="w-full">
      <RegisterForm />
    </div>
  );
}