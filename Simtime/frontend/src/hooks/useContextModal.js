import React from "react";

export default () => {
  let [contextModal, setContextModal] = React.useState(false);
  let [contextModalContent, setContextModalContent] = React.useState(
    "I'm the Modal Content"
  );

  let handleContextModal = (content = false) => {
    setContextModal(!contextModal);
    if (content) {
      setContextModalContent(content);
    }
  };

  let closeContextModal = (content = false) => {
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
