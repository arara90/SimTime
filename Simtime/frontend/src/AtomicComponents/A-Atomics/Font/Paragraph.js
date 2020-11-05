import * as Colors from "../../Colors";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const A = styled.a`
  font-size: ${(props) => props.fontSize};
  color: ${Colors.TEXT_LINK};
  &:link {
    color: ${Colors.TEXT_LINK};
  }
  &:hover {
    color: ${Colors.TEXT_ACTIVE};
  }
  &:visited {
    color: ${Colors.TEXT_VISITED};
  }
`;

const Span = styled.span`
  color: ${(props) => Colors[props.color]};
  font-size: ${(props) => props.fontSize};
`;

const Button = styled.span`
  color: ${(props) => Colors[props.color]};
  font-size: ${(props) => props.fontSize};
  // text-decoration: underline;
`;

const Tag = styled.span`
  color: ${Colors.ST_GRAY};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  text-decoration: underline;
`;

const Default = styled.span`
  color: ${(props) => Colors[props.color]};
  font-size: ${(props) => props.fontSize};
`;

export const Paragaph = (props) => {
  const { type, src } = props;

  const renderParagaph = () => {
    switch (type) {
      case "a":
        return <A href={src} {...props}></A>;
      case "button":
        return <Button {...props}></Button>;
      case "tag":
        return <Tag {...props}></Tag>;
      case "span":
      default:
        return <Span {...props}></Span>;
    }
  };

  return renderParagaph();
};

export default React.memo(Paragaph);

Paragaph.propTypes = {
  type: PropTypes.oneOf(["a", "span", "tag", "button"]),
  src: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
};

Paragaph.defaultProps = {
  type: "span",
  src: "http://localhost:8080/",
  color: "TEXT",
  fontSize: "13px",
};
