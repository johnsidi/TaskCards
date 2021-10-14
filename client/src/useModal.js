//https://w3collective.com/react-modal-component/
import { useState } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState(false);
  function toggleModal() {
    setVisible(!visible);
  }
  return { toggleModal, visible };
};

export default useModal;
