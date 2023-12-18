
import { useDispatch, useSelector } from 'react-redux';
import { onOpen, onClose } from '@/features/slicers/registerSlice';
import { RootState } from '@/features/store';

export const useRegisterModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.registerModal.isOpen);

  const handleOpen = () => dispatch(onOpen());
  const handleClose = () => dispatch(onClose());

  return { isOpen, onOpen: handleOpen, onClose: handleClose };
};
