import { ReactNode } from 'react';

export type ModalState = {
  modalContent: ReactNode | null;
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
};
