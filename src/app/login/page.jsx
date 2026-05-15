'use client';
import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {
  Button,
  Description,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

const LogInPage = () => {
  const router = useRouter();

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      alert('Login successful');
      router.push('/');
    }
    if (error) {
      alert('Sign up error:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-linear-to-br from-slate-50 to-slate-200 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-[450px]">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Sign in to continue your adventure
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
          <div className="p-8 sm:p-10">
            <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
              <TextField
                isRequired
                name="email"
                type="email"
                validate={value => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return 'Please enter a valid email address';
                  }
                  return null;
                }}
              >
                <Label className="font-semibold ml-1 mb-1 block text-sm">
                  Email
                </Label>
                <Input
                  placeholder="name@example.com"
                  className="rounded-2xl border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all h-12"
                />
                <FieldError className="text-xs text-red-500 mt-1 ml-1" />
              </TextField>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={value => {
                  if (value.length < 8) {
                    return 'Password must be at least 8 characters';
                  }
                  return null;
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <Label className="font-semibold ml-1 block text-sm">
                    Password
                  </Label>
                </div>
                <Input
                  placeholder="••••••••"
                  className="rounded-2xl border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all h-12"
                />
                <FieldError className="text-xs text-red-500 mt-1 ml-1" />
              </TextField>

              <Button
                type="submit"
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold h-12 rounded-2xl hover:scale-[1.02] transition-transform active:scale-[0.98] mt-2 shadow-lg shadow-slate-200 dark:shadow-none"
              >
                <Check className="w-4 h-4 mr-1" />
                Sign In
              </Button>
            </Form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-zinc-800"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/0 px-2 text-slate-500 dark:text-zinc-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-12 rounded-2xl font-semibold border-slate-200 dark:border-zinc-800 hover:bg-slate-50
              hover:shadow-md
              dark:hover:bg-zinc-800/50 transition-shadow
              duration-300"
            >
              <FaGoogle className="w-4 h-4 mr-2 " /> Google
            </Button>
          </div>

          <div className="bg-slate-50/50 dark:bg-zinc-800/30 py-6 px-8 text-center border-t border-slate-100 dark:border-zinc-800/50">
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-bold text-slate-900 dark:text-white hover:underline transition-all"
              >
                Sign up
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LogInPage;
