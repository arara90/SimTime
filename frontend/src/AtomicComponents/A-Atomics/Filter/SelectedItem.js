import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ST_WHITE, ST_YELLOW_LIGHT } from "../../Colors";
import Paragraph from "../Font/Paragraph";
import Image from "../Image";

const ContentWrap = styled.div`
  height: 24px;
  background-color: ${ST_YELLOW_LIGHT};
  border-radius: 6px;

  display: inline-flex;
  flex-direction: row;
  align-items: center;

  padding-left: 6px;
  padding-right: 6px;

  margin-right: 3px;
`;

const Content = styled(Paragraph)`
  margin-right: 6px;

  min-width: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const DeleteIcon = styled(Image)`
  cursor: pointer;
`;

function SelectedItem(props) {
  return (
    <ContentWrap {...props}>
      <Content {...props} fontSize="12px" color="MAIN_COLOR">
        {props.children}
      </Content>
      <DeleteIcon
        onClick={props.deleteItem}
        src="https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/close.png"
        width="8px"
        height="8px"
      />
    </ContentWrap>
  );
}

export default SelectedItem;

SelectedItem.propTypes = {};

SelectedItem.defaultProps = {};
