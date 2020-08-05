import React from "react";

export default () => {
  let [modal, setModal] = React.useState(false);
  let [modalContent, setModalContent] = React.useState("I'm the Modal Content");

  let handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  let closeModal = (content = false) => {
    setModal(false);
    setModalContent(content);
  };

  let openModal = (content = false) => {
    setModal(true);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, setModal, handleModal, openModal, closeModal, modalContent };
};
