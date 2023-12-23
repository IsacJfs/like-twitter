import { useDispatch, useSelector } from "react-redux";
import { onOpen, onClose } from "../slicers/editModalSlice";
import { RootState } from "../store";

export const useEditModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.editModal.isOpen);

  const handleOpen = () => dispatch(onOpen());
  const handleClose = () => dispatch(onClose());

  return { onOpen: handleOpen, onClose: handleClose, isOpen };
}

