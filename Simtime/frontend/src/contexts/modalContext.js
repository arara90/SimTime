import React from "react";
import useContextModal from "../hooks/useContextModal";
import ModalContextPortal from "../AtomicComponents/A-Atomics/Modal/ModalPortal";

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
  let {
    contextModal,
    contextModalContent,
    setContextModalContent,
    setContextModal,
    handleContextModal,
    openContextModal,
    closeContextModal,
  } = useContextModal();

  return (
    <Provider
      value={{
        contextModal,
        contextModalContent,
        setContextModalContent,
        setContextModal,
        handleContextModal,
        openContextModal,
        closeContextModal,
      }}
    >
      <ModalContextPortal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
