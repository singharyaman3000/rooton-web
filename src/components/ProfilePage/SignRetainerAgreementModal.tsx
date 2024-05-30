import AgreementSigner from '@/utils/AgreementSigner';
import { Modal, ModalDialog, ModalClose, Typography } from '@mui/joy';

interface SignRetainerAgreementModalProps {
  toggleModal: () => void;
  email: string;
  isModalOpen: boolean;
  docShorthand?: string;
}

function SignRetainerAgreementModal({
  toggleModal,
  email,
  isModalOpen,
  docShorthand,
}: SignRetainerAgreementModalProps) {
  return (
    <Modal open={isModalOpen} onClose={toggleModal} className="custom-modal">
      <ModalDialog variant="soft">
        <ModalClose />
        <Typography component="h2">Sign Retainer Agreement</Typography>
        {email && email.length !== 0 && <AgreementSigner docShorthand={docShorthand} mail={email} />}
        {(!email || email.length === 0) && <div>

        </div>}
      </ModalDialog>
    </Modal>
  );
}

export default SignRetainerAgreementModal;
