import apiClient from '@/lib/apiClient';
import { UserState } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      accessToken: null,
      refreshToken: null,

      setTokens: ({ accessToken, refreshToken }) =>
        set(() => ({
          isLoggedIn: true,
          accessToken,
          refreshToken,
        })),

      getUserInfo: async () => {
        const { accessToken } = get();

        if (!accessToken) {
          console.error('No access token found');
          return;
        }

        try {
          const response = await apiClient.get('/account/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userData = response.data;

          set(() => ({
            user: {
              id: userData.id,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              dateOfBirth: userData.dateOfBirth,
              sightingsNum: userData.sightingsNum,
              pictureUrl: userData.pictureUrl,
            },
          }));
        } catch (error) {
          console.error('Failed to fetch user info', error);
        }
      },

      logout: () => {
        set(() => ({
          isLoggedIn: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        }));
      },
    }),
    {
      name: 'FlowrSpotUserStore',
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState || {}),
      }),
    }
  )
);
