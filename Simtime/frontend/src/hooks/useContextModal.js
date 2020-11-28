import React from "react";

export default () => {
  let [contextModal, setContextModal] = React.useState(false);
  let [contextModalContent, setContextModalContent] = React.useState(null);

  let handleContextModal = (content = false) => {
    setContextModal(!contextModal);
    if (content) setContextModalContent(content);
  };

  let closeContextModal = () => {
    setContextModal(false);
    setContextModalContent(null);
  };

  let openContextModal = (content = false) => {

    if (content) {
      setContextModal(true);
      setContextModalContent(content);
    }else{
      console.log('no Content')
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
