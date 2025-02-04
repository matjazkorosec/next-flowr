'use client';

import AvatarPhoto from '@/assets/avatar.jpg';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type UserProfileProps = {
  onCloseModal?: () => void;
  dialog?: boolean;
};

const UserProfile = ({ onCloseModal, dialog = false }: UserProfileProps) => {
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    if (onCloseModal) {
      onCloseModal();
    } else {
      router.push('/');
    }
  };

  if (!user && !onCloseModal) {
    return (
      <>
        <h1 className="mb-6 text-[40px] leading-[40px] font-light">
          User Profile
        </h1>
        <p>No user logged in.</p>
      </>
    );
  }

  return (
    <div className="user-profile">
      {!dialog && (
        <h1 className="mb-10 text-[40px] leading-[40px] font-light">
          User Profile
        </h1>
      )}
      <figure className="avatar">
        <Image
          src={user?.pictureUrl || AvatarPhoto.src}
          alt="Avatar"
          width={80}
          height={80}
        />
        <div className="figcaption">
          <h3>
            {user?.firstName} {user?.lastName}
          </h3>
          <p>{user?.sightingsNum} sightings</p>
        </div>
      </figure>

      <dl className="personal-data">
        <dt>First Name</dt>
        <dd>{user?.firstName}</dd>
        <dt>Last Name</dt>
        <dd>{user?.lastName}</dd>
        <dt>Date of Birth</dt>
        <dd>{user?.dateOfBirth}</dd>
        <dt>Email Address</dt>
        <dd>{user?.email}</dd>
      </dl>

      <div className="actions">
        <button className="make-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
