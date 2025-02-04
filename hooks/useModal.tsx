'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UserSignup from '@/components/forms/UserSignup';
import UserLogin from '@/components/forms/UserLogin';
import UserProfile from '@/components/modals/UserProfile';
import { useState } from 'react';

const useModal = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openModal = (modal: 'signup' | 'login' | 'profile') => {
    if (modal === 'signup') setIsSignupModalOpen(true);
    if (modal === 'login') setIsLoginModalOpen(true);
    if (modal === 'profile') setIsProfileModalOpen(true);
  };

  const closeModal = (modal: 'signup' | 'login' | 'profile') => {
    if (modal === 'signup') setIsSignupModalOpen(false);
    if (modal === 'login') setIsLoginModalOpen(false);
    if (modal === 'profile') setIsProfileModalOpen(false);
  };

  const renderModals = () => {
    return (
      <>
        <Dialog
          open={isLoginModalOpen}
          onOpenChange={() => closeModal('login')}
        >
          <DialogTrigger asChild />
          <DialogContent>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <UserLogin
              dialog={true}
              onCloseModal={() => closeModal('login')}
              onProfileModalOpen={() => {
                closeModal('login');
                openModal('profile');
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={isSignupModalOpen}
          onOpenChange={() => closeModal('signup')}
        >
          <DialogTrigger asChild />
          <DialogContent>
            <DialogTitle>Create an Account</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <UserSignup
              dialog={true}
              onCloseModal={() => closeModal('signup')}
              onLoginModalOpen={() => {
                closeModal('signup');
                openModal('login');
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={isProfileModalOpen}
          onOpenChange={() => closeModal('profile')}
        >
          <DialogTrigger asChild />
          <DialogContent className="md:w-[590px]">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <UserProfile
              dialog={true}
              onCloseModal={() => closeModal('profile')}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return {
    openModal,
    renderModals,
  };
};

export default useModal;
