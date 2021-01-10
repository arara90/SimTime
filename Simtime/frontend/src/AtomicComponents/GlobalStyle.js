import { createGlobalStyle } from "styled-components";
import * as Colors from "./Colors";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "roboto", "Source Sans";
}

width: 100%;

#app{
    display: flex;
    flex-direction: row;
    justify-content : center;
}

dl, ol, ul {
  padding: 0;
  margin: 0;
}

h1, h2, h3, h4, h5, h6{
  margin: 0;
  padding: 0;
}

.app-contents{
  float: left;
  width: 920px;
  padding: 0 0.5rem 0.5rem 0.5rem;
  border-top: solid 8px ${Colors.MAIN_COLOR};

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 0 0 0;
  }
}

&::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

&::-webkit-scrollbar-thumb {
  background-color: ${Colors.ST_GRAY};
  border-radius: 10px;

  &:hover {
    background-color: ${Colors.ST_SEMI_YELLOW};
  }

  
  &:active {
    background-color: ${Colors.ST_SEMI_YELLOW};
  }
}

&::-webkit-scrollbar-track {
  background-color: ${Colors.ST_SEMI_GRAY};
  border-radius: 5px;
  box-shadow: inset 0px 0px 3x white;
}


a{
  color: ${Colors.TEXT_LINK};
  &:link {
    color: ${Colors.TEXT_LINK};
  }
  &:hover {
    color: ${Colors.TEXT_ACTIVE};
    text-decoration: none;
  }
  &:visited {
    color: ${Colors.TEXT_VISITED};
  }
}
`;

// strong{}
// em{}
// ins{}
// del{}


export default GlobalStyle;
