import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

type LoginSuccessProps = {
  onClose: () => void;
  onProfileOpen: () => void;
};

const LoginSuccess = ({ onClose, onProfileOpen }: LoginSuccessProps) => {
  return (
    <DialogContent>
      <DialogTitle>Congratulations!</DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>
      <div className="avatar">
        <p className="!text-sm">You have successfully logged into FlowrSpot!</p>
      </div>
      <div className="actions !flex justify-between !pb-0">
        <button className="make-button" onClick={onClose}>
          OK
        </button>
        <button
          className="make-button"
          onClick={() => {
            onClose();
            onProfileOpen();
          }}
        >
          Profile
        </button>
      </div>
    </DialogContent>
  );
};

export default LoginSuccess;
