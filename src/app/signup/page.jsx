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

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      router.push('/');
    }
    if (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <div className="w-full max-w-[450px]">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Start your adventure with Wonderlust
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] p-8">
          <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <TextField name="name" isRequired type="text">
              <Label className="font-semibold ml-1 mb-1 block">Full Name</Label>
              <Input
                placeholder="Enter your name"
                className="rounded-xl border-slate-200 dark:border-zinc-800"
              />

              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

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
              <Label className="font-semibold ml-1 mb-1 block">Password</Label>
              <Input
                placeholder="Enter your password"
                className="rounded-xl border-slate-200 dark:border-zinc-800"
              />
              <Description className="text-[10px] text-slate-400 mt-1 ml-1 leading-tight">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField name="image" type="url">
              <Label className="font-semibold ml-1 mb-1 block">Image URL</Label>
              <Input
                placeholder="Enter your image URL"
                className="rounded-xl border-slate-200 dark:border-zinc-800"
              />

              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <div className="flex flex-col gap-3 mt-4">
              <Button
                type="submit"
                className="w-full bg-cayan-500 hover:bg-cayan-600 dark:bg-white text-white dark:text-slate-900 font-bold h-12 rounded-xl hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                <Check className="w-4 h-4 mr-1" />
                Sign Up
              </Button>
              <Button
                type="reset"
                variant="flat"
                className="w-full font-semibold h-12 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Reset
              </Button>
            </div>
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

          <div className="bg-slate-50/50 dark:bg-zinc-800/30 py-6 px-8 text-center border-t border-slate-100 dark:border-zinc-800/50">
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-bold text-slate-900 dark:text-white hover:underline transition-all"
              >
                Log in
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
