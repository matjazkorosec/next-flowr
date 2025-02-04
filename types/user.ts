export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sightingsNum: number;
  pictureUrl: string;
};

export type UserState = {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  getUserInfo: () => Promise<void>;
  logout: () => void;
};
