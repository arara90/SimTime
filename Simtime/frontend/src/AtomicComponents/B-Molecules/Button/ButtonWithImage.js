import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MAIN_COLOR } from "../../Colors";
import Paragraph from "../../A-Atomics/Font/Paragraph";

const Wrap = styled.button`
  // width: ${(props) => props.width};
  // height: ${(props) => props.height};

  outline: none;
  border: none;
  background-color: transparent;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  cursor: pointer;

  &:focus{
    outline:none;
  }
`;

const Content = styled(Paragraph)`
//  border: solid 1px blue;
  margin-${(props) => props.imgLocation}: 3px;
`;

const Icon = styled.img`
  width: ${(props) => props.imgWidth};
  height: ${(props) => props.imgHeight};
  margin-bottom: 1px;
`;

function ButtonWithImage(props) {
  const {
    height,
    width,
    fontSize,
    button,
    imgurl,
    imgHeight,
    imgWidth,
    imgLocation,
  } = props;

  const renderButton = () => {
    if (button.url) {
      if (props.imgLocation == "right" || props.imgLocation == "bottom") {
        return (
          <Fragment>
            <Content
              height={props.height}
              color="TEXT"
              fontSize={props.fontSize}
              imgLocation={props.imgLocation}
            >
              {button.content}
            </Content>
            <Icon
              className="btn-icon"
              src={button.url}
              imgHeight={props.imgHeight}
              imgWidth={props.imgWidth}
            />
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Icon
              url={button.url}
              imgHeight={props.imgHeight}
              imgWidth={props.imgWidth}
            />
            <Content
              height={props.height}
              color="TEXT"
              fontSize={props.fontSize}
              imgLocation={props.imgLocation}
            >
              {button.content}
            </Content>
          </Fragment>
        );
      }
    } else {
      return (
        <Fragment>
          <Content
            height={props.height}
            color="TEXT"
            fontSize={props.fontSize}
            imgLocation={props.imgLocation}
          >
            {button.content}
          </Content>
        </Fragment>
      );
    }
  };

  return <Wrap {...props}>{renderButton()}</Wrap>;
}

export default ButtonWithImage;

ButtonWithImage.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  button: PropTypes.object,
  imgurl: PropTypes.string,
  imgHeight: PropTypes.string,
  imgWidth: PropTypes.string,
  imgLocation: PropTypes.string,
};

ButtonWithImage.defaultProps = {
  height: "20px",
  width: "auto",
  fontSize: "13px",
  button: {
    content: "add",
    url: null,
  },
  imgHeight: "13px",
  imgWidth: "13px",
  imgLocation: "right",
};
