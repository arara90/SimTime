import React from "react";
import useContextModal from "../hooks/useContextModal";
import ModalContextPortal from "../AtomicComponents/A-Atomics/Modal/ModalPortal";

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
  let {
    contextModal,
    setContextModal,
    handleContextModal,
    openContextModal,
    closeContextModal,
    contextModalContent,
  } = useContextModal();

  return (
    <Provider
      value={{
        contextModal,
        setContextModal,
        handleContextModal,
        openContextModal,
        closeContextModal,
        contextModalContent,
      }}
    >
      <ModalContextPortal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
