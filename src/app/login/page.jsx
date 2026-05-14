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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <div className="w-full max-w-[450px]">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Log In
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back to Wonderlust
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] p-2">
          <div className="p-8">
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
                <Label className="font-semibold ml-1 mb-1 block">Email</Label>
                <Input
                  placeholder="john@example.com"
                  className="rounded-xl border-slate-200 dark:border-zinc-800"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
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
                  if (!/[A-Z]/.test(value)) {
                    return 'Password must contain at least one uppercase letter';
                  }
                  if (!/[0-9]/.test(value)) {
                    return 'Password must contain at least one number';
                  }
                  return null;
                }}
              >
                <Label className="font-semibold ml-1 mb-1 block">
                  Password
                </Label>
                <Input
                  placeholder="Enter your password"
                  className="rounded-xl border-slate-200 dark:border-zinc-800"
                />
                <Description className="text-[10px] text-slate-400 mt-1 ml-1 leading-tight">
                  Must be at least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              <div className="flex flex-col gap-3 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-cayan-500 hover:bg-cayan-600 dark:bg-white text-white dark:text-slate-900 font-bold h-12 rounded-xl hover:scale-[1.02] transition-transform active:scale-[0.98]"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Log In
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LogInPage;
