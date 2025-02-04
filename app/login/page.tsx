import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import UserLogin from '@/components/forms/UserLogin';

export const metadata: Metadata = {
  title: 'FlowrSpot - Login',
  description: 'Login description',
};

const ProfilePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="adapt p-8 bg-background">
          <div className="mx-auto max-w-[440px]">
            <UserLogin />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
