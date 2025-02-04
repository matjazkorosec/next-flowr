import type { Metadata } from 'next';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'FlowrSpot - Favorites',
  description: 'Favorites description',
};

const ProfilePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="adapt p-8 bg-background">
          <h1 className="mb-6 text-[40px] leading-[40px] font-light">
            Favorites
          </h1>
          <p>Here be favorites</p>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
