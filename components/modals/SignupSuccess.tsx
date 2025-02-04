import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

type SignupSuccessProps = {
  onClose: () => void;
  onLoginOpen: () => void;
};

const SignupSuccess = ({ onClose, onLoginOpen }: SignupSuccessProps) => {
  return (
    <DialogContent>
      <DialogTitle className="hidden">Congratulations!</DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>
      <div className="avatar">
        <p className="!text-sm">
          You have successfully signed up for FlowrSpot!
        </p>
      </div>
      <div className="actions !pb-0">
        <button
          className="make-button"
          onClick={() => {
            onClose();
            onLoginOpen();
          }}
        >
          OK
        </button>
      </div>
    </DialogContent>
  );
};

export default SignupSuccess;
