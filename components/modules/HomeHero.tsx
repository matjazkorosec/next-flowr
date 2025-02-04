import bgrHero from '@/assets/home-hero.jpg';
import HeroSearch from '@/components/forms/HeroSearch';

const HomeHero = () => {
  return (
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${bgrHero.src})` }}
    >
      <div className="adapt">
        <div className="content">
          <h1>
            Discover flowers <span>around you</span>
          </h1>
          <p>Explore between more than 8.427 sightings</p>
        </div>
        <HeroSearch />
      </div>
    </section>
  );
};

export default HomeHero;
