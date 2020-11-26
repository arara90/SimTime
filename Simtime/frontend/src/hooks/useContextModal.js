import React from "react";

export default () => {
  let [contextModal, setContextModal] = React.useState(false);
  let [contextModalContent, setContextModalContent] = React.useState(
    "I'm the Modal Content"
  );

  let handleContextModal = (content = false) => {
    console.log('handleContextModal', contextModal)
    setContextModal(!contextModal);
    if (content) {
      setContextModalContent(content);
    }
  };

  let closeContextModal = () => {
    console.log('closeContext')
    setContextModal(false);
    setContextModalContent(null);
  };

  let openContextModal = (content = false) => {
    setContextModal(true);
    if (content) {
      setContextModalContent(content);
    }
  };

  return {
    contextModal,
    contextModalContent,
    setContextModal,
    setContextModalContent,
    handleContextModal,
    openContextModal,
    closeContextModal,
  };
};
