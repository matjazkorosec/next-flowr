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
import { UserSchema } from '@/schemas';
import { useState, useTransition } from 'react';
import apiClient from '@/lib/apiClient';
import { AxiosError } from 'axios';
import { useModalStore } from '@/store/modalStore';
import SignupSuccess from '@/components/modals/SignupSuccess';

type UserSignupProps = {
  onCloseModal?: () => void;
  onLoginModalOpen?: () => void;
  dialog?: boolean;
};

const UserSignup = ({
  onCloseModal,
  onLoginModalOpen,
  dialog = false,
}: UserSignupProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const showModal = useModalStore((state) => state.showModal);

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    startTransition(async () => {
      try {
        const response = await apiClient.post('/account/register', values);
        if (response.status === 201) {
          if (onCloseModal) onCloseModal();

          showModal(
            <SignupSuccess
              onClose={() => showModal(null)}
              onLoginOpen={() => {
                showModal(null);
                if (onLoginModalOpen) onLoginModalOpen();
              }}
            />
          );
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            setErrorMessage(
              'Signup failed, user with this email already exist.'
            );
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
          Create an Account
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
            <div className="two-cols">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1 inside-label">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your first name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1 inside-label">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your last name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="inside-label">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserSignup;
