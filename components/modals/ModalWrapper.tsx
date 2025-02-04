import { useModalStore } from '@/store/modalStore';
import { Dialog } from '@/components/ui/dialog';

const ModalWrapper = () => {
  const { modalContent, hideModal } = useModalStore();

  return (
    <Dialog open={!!modalContent} onOpenChange={hideModal}>
      {modalContent}
    </Dialog>
  );
};

export default ModalWrapper;
