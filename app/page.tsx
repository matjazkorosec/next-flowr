import Header from '@/components/layout/header';
import HomeHero from '@/components/modules/HomeHero';
import ItemsDisplay from '@/components/modules/ItemsDisplay';

const Home = () => {
  return (
    <>
      <Header />
      <main className="main">
        <HomeHero />
        <ItemsDisplay />
      </main>
    </>
  );
};

export default Home;
