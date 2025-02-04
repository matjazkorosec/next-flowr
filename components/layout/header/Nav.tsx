'use client';

import useNavigation from '@/hooks/useNavigation';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import AvatarPhoto from '@/assets/avatar.jpg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useModal from '@/hooks/useModal';
import ModalWrapper from '@/components/modals/ModalWrapper';

const Nav = () => {
  const { menuItems } = useNavigation();
  const { openModal, renderModals } = useModal();
  const { user } = useUserStore();

  return (
    <>
      <nav className="menu">
        <ul className="navigation">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}

          {user ? (
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  openModal('profile');
                }}
                href="/profile"
                className="profile"
              >
                {user.firstName} {user.lastName}
                <Avatar>
                  <AvatarImage src={user.pictureUrl || AvatarPhoto.src} />
                </Avatar>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    openModal('login');
                  }}
                  href="/login"
                  className="login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    openModal('signup');
                  }}
                  href="/signup"
                  className="make-button"
                >
                  New Account
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {renderModals()}
      <ModalWrapper />
    </>
  );
};

export default Nav;
