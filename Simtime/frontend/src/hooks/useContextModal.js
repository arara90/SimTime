import React from "react";

export default () => {
  let [contextModal, setContextModal] = React.useState(false);
  let [contextModalContent, setContextModalContent] = React.useState(
    "I'm the Modal Content"
  );

  let handleContextModal = (content = false) => {
    console.log('handleContextModal')
    setContextModal(!contextModal);
    if (content) {
      setContextModalContent(content);
    }
  };

  let closeContextModal = (content = false) => {
    console.log('closeContext')
    setContextModal(false);
    setContextModalContent(content);
  };

  let openContextModal = (content = false) => {
    setContextModal(true);
    if (content) {
      setContextModalContent(content);
    }
  };

  return {
    contextModal,
    setContextModal,
    handleContextModal,
    openContextModal,
    closeContextModal,
    contextModalContent,
  };
};
