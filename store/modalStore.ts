import { ModalState } from '@/types/modal';
import { create } from 'zustand';

export const useModalStore = create<ModalState>((set) => ({
  modalContent: null,
  showModal: (content) => set({ modalContent: content }),
  hideModal: () => set({ modalContent: null }),
}));
