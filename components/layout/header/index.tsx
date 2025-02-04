import Logo from '@/components/layout/header/Logo';
import Nav from '@/components/layout/header/Nav';
import Hamburger from '@/components/layout/header/Hamburger';

const Header = () => {
  return (
    <header className="header">
      <div className="adapt">
        <Logo />
        <Hamburger />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
