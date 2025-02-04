import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import UserSignup from '@/components/forms/UserSignup';

export const metadata: Metadata = {
  title: 'FlowrSpot - Sign up',
  description: 'Sign up description',
};

const ProfilePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="adapt p-8 bg-background">
          <div className="mx-auto max-w-[440px]">
            <UserSignup />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
