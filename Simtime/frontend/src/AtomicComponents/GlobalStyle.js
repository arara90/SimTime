import { createGlobalStyle } from "styled-components";
import * as Colors from "./Colors";

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  font-family: "roboto", "Source Sans";
}

html{
  scroll-behavior: smooth;
  max-width: 1464px;
}

body{
  margin: 0;
}

#app{
  box-shadow: none;
  margin: 0px auto;
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

button{
  background-color: transparent;
  border: 1px solid transparent;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
};

#simtime-header{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;

  margin-bottom: 15px;
  border-top: solid 8px ${Colors.MAIN_COLOR};
  background: white;

  display: flex;
  flex-direction: column;
                                      
  @media only screen and (max-width: 680px) {
    margin-bottom: 0px;
  }
}

#simtime-page{
  position: relative;
  min-height: calc(100vh - ${({headerHeight})=>headerHeight}px);
  top: ${({headerHeight})=>headerHeight}px;
  margin-top:10px;
}


`;

// strong{}
// em{}
// ins{}
// del{}


export default GlobalStyle;
