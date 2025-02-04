'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '@/schemas';
import { useState, useTransition } from 'react';
import apiClient from '@/lib/apiClient';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/userStore';
import { useModalStore } from '@/store/modalStore';
import LoginSuccess from '@/components/modals/LoginSuccess';

type UserLoginProps = {
  onCloseModal?: () => void;
  onProfileModalOpen?: () => void;
  dialog?: boolean;
};

const UserLogin = ({
  onCloseModal,
  onProfileModalOpen,
  dialog = false,
}: UserLoginProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const { setTokens, getUserInfo } = useUserStore();
  const showModal = useModalStore((state) => state.showModal);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      try {
        const response = await apiClient.post('/account/login', values);

        if (response.status === 201) {
          const { accessToken, refreshToken } = response.data;
          setTokens({ accessToken, refreshToken });

          await getUserInfo();
          if (onCloseModal) onCloseModal();

          showModal(
            <LoginSuccess
              onClose={() => showModal(null)}
              onProfileOpen={() => {
                showModal(null);
                if (onProfileModalOpen) onProfileModalOpen();
              }}
            />
          );
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (
            error.response?.status === 400 ||
            error.response?.status === 404
          ) {
            setErrorMessage('Incorrect email or password.');
          } else {
            setErrorMessage('An unexpected error occurred. Please try again.');
          }
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }

        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    });
  };

  return (
    <>
      {!dialog && (
        <h1 className="mb-6 text-[40px] leading-[40px] font-light">
          Welcome Back
        </h1>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`space-y-5 ${isShaking ? 'shake' : ''}`}
        >
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="inside-label">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="example@email.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="inside-label">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit" className="submit">
            {isPending ? 'Logging in...' : 'Login to your Account'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserLogin;
