import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import UserProfile from '@/components/modals/UserProfile';

export const metadata: Metadata = {
  title: 'FlowrSpot - Profile',
  description: 'Profile description',
};

const ProfilePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="adapt p-8 bg-background">
          <div className="mx-auto max-w-[590px]">
            <UserProfile />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
