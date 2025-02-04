import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/flowrspot.svg';

const Logo = () => {
  return (
    <>
      <Link href="/">
        <figure>
          <Image src={logo} alt="FlowrSpot logo" width={169} height={30} />
        </figure>
      </Link>
    </>
  );
};

export default Logo;
