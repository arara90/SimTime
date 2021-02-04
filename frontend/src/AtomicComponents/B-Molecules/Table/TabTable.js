import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_SEMI_YELLOW,
  ST_GRAY_LIGHT,
  ST_BLUE,
} from "../../Colors";

import ColoredButton from "../../A-Atomics/Button/ColoredButton";
import TableTitle from "../../A-Atomics/Table/TableTitle";
import Header from "../../A-Atomics/Font/Header";
import ButtonWithImage from "../../B-Molecules/Button/ButtonWithImage";

const Wrap = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const StyledTableTitle = styled(TableTitle)`
  height: 26px;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.align};
  align-items: flex-end;
  padding-left: 10px;
`;

const Tabs = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Tab = styled(ButtonWithImage)`
  width: 72px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.active
      ? `
    height: 100%;
    border: solid 1px ${MAIN_COLOR};
    background-color: white; 
    border-bottom: none;
    margin-bottom: -1px;
  `
      : `
      background-color: ${ST_GRAY_LIGHT};
      border: solid 1px ${ST_SEMI_YELLOW};
      border-bottom: solid 1px ${ST_GRAY_LIGHT};
      margin-bottom: 0px;
      height: 85%;
      `}
`;
const ContentWrap = styled.div`
  padding: 5px 5px 5px 5px;
  border: solid 1px ${MAIN_COLOR};
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableContent = styled.div`
  height: ${(props) => props.height};
  width: 100%;
`;

function TabTable(props) {
  const [activeTab, setActiveTab] = useState(props.buttons[0].content);

  const clickHandler = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTab(tab);
    props.changeHandler(tab);
  };

  const renderButtons = (buttons) => {
    return buttons.map((button) => {
      return (
        <Tab
          key={button.content}
          active={activeTab == button.content}
          button={button}
          onClick={
            activeTab == button.content
              ? undefined
              : (e) => clickHandler(e, button.content)
          }
        />
      );
    });
  };

  return (
    <Wrap {...props}>
      <StyledTableTitle align={props.title ? "space-between" : "flex-end"}>
        {props.title ? (
          <Header type="h4" color={props.titleColor}>
            {props.title}
          </Header>
        ) : null}
        <Tabs>{renderButtons(props.buttons)}</Tabs>
      </StyledTableTitle>
      <ContentWrap height="auto">
        <TableContent height="auto"> {props.children}</TableContent>
      </ContentWrap>
    </Wrap>
  );
}

export default TabTable;

TabTable.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  addButton: PropTypes.bool,
  handleAddBtnClick: PropTypes.func,
  buttons: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  rowNum: PropTypes.number,
  rowHeight: PropTypes.string,
  headers: PropTypes.array,
  datas: PropTypes.array,
};

TabTable.defaultProps = {
  title: "Members",
  titleColor: "MAIN_COLOR",
  addButton: false,
  handleAddBtnClick: () => {
    alert("click");
  },
  buttons: [
    {
      content: "Tab1",
      url: null,
    },
  ],
  width: "100%",
  height: "auto",
  rowHeight: "45px",
  headers: null,
  datas: null,
  rowNum: 1,
};
