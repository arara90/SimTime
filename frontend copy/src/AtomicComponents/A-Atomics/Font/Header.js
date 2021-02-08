import * as Colors from "../../Colors";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

//   const styledContent = (props) => {
//     const commonStyle = `
//       color: ${Colors[props.color]};
//       font-size: ${props.fontSize ? props.fontSize : ""};
//       ${props.height ? "height: " + props.height + ";" : ""}
//     `;

//     switch (props.type) {
//       case "h1":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 700;
//           font-size: ${props.fontsize ? props.fontSize : "36px"};
//         `;

//       case "h2":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 700;
//           font-size: ${props.fontSize ? props.fontSize : "24px"};
//         `;

//       case "h3":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 600;
//           font-size: ${props.fontSize ? props.fontSize : "18px"};
//         `;

//       case "h4":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 500;
//           font-size: ${props.fontSize ? props.fontSize : "15px"};
//         `;

//       default:
//         return styled.span`
//           ${commonStyle}
//           font-size: ${props.fontSize ? props.fontSize : "15px"};
//         `;
//     }
//   };

//   const Content = styledContent(props);

//   const renderText = () => {
//     switch (type) {
//       case "a":
//         return <Content href={src} {...props}></Content>;
//       default:
//         return <Content {...props}></Content>;
//     }
//   };

// const HT = styled.h4``

const commonStyle = css`
  ${(props) => (props.height ? "height: " + props.height + ";" : "")}
  color: ${(props) => Colors[props.color]};
`;

const H1 = styled.span`
  ${commonStyle}
  font-weight: 700;
  font-size: 36px;
`;

const H2 = styled.span`
  ${commonStyle}
  font-weight: 700;
  font-size: 24px;
`;

const H3 = styled.span`
  ${commonStyle}
  font-weight: 600;
  font-size: 18px;
`;

const H4 = styled.span`
  ${commonStyle}
  font-weight: 500;
  font-size: 15px;
`;

const Default = styled.span`
  ${commonStyle}
  font-size: "15px";
`;

export const Header = (props) => {
  const { type, src } = props;

  const renderHeader = () => {
    switch (props.type) {
      case "h1":
        return <H1 {...props}></H1>;
      case "h2":
        return <H2 {...props}></H2>;
      case "h3":
        return <H3 {...props}></H3>;
      case "h4":
        return <H4 {...props}></H4>;
      default:
        return <Default {...props}></Default>;
    }
  };

  return renderHeader();
};

export default React.memo(Header);

Header.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  src: PropTypes.string,
  color: PropTypes.string,
};

Header.defaultProps = {
  type: "h1",
  src: "http://localhost:8080/",
  color: "TEXT",
};
