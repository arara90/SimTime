import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MAIN_COLOR, ST_GRAY } from "../Colors";
import Header from "../A-Atomics/Font/Header";
import Paragraph from "../A-Atomics/Font/Paragraph";
import UserCard from "../B-Molecules/User/UserCard";
import Image from "../A-Atomics/Image";
import ImageUser from "../A-Atomics/ImageUser";
import Map from "../A-Atomics/Map/Map";
import ColoredButton from "../A-Atomics/Button/ColoredButton";

const Wrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 4px 8px 8px;
  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`;

const TitleWrap = styled.div`
  line-height: 30px;
  height: 30px;
  width: 100%;
`;

const StyledTitle = styled(Paragraph)`
  font-weight: 500;
`;

const DetailWrap = styled.div`
  height: 400px;
  width: 94%;
`;
const Content = styled.div`
  border-top: dashed 1px ${ST_GRAY};
  height: 30px;
  line-height: 30px;
`;
const StyledParagraph = styled(Paragraph)`
  margin-left: 2px;
  margin-right: 2px;
  font-weight: 600;
  font-size: 15px;
`;

const AttendanceList = styled.div`
  border-top: dashed 1px ${ST_GRAY};
  padding-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const Attendee = styled(ImageUser)`
  margin-right: 6px;
  width: 30px;
  height: 30px;
`;

const StyledMap = styled(Map)`
  margin-top: 14px;
`;

const StyledComment = styled.div`
  margin-top: 6px;
  height: 24%;
  width: 100%;
  overflow: auto;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled(ColoredButton)`
  margin-top: 12px;
`;

function DetailContent(props) {
  return (
    <Wrap {...props}>
      <TitleWrap>
        <StyledTitle fontSize="15px" color="MAIN_COLOR">
          Details
        </StyledTitle>
      </TitleWrap>
      <DetailWrap>
        <Content>
          {" "}
          <StyledParagraph>여의나루역 4번출구</StyledParagraph>
        </Content>
        <Content>
          {" "}
          <StyledParagraph>2020/04/03 (월) PM 8:00 </StyledParagraph>
        </Content>
        <Content>
          {" "}
          <StyledParagraph>6 / 10 PAX</StyledParagraph>
        </Content>

        <AttendanceList>
          <Attendee />
          <Attendee />
          <Attendee />
          <Attendee />
        </AttendanceList>

        <StyledMap width="100%" height="38%" mapId="eventDetailMap" />
        <StyledComment>
          <Paragraph>
            Whether its a driving tour, a cruise or a bus, leaf viewing is a
            great way to spend a fall vacation.
          </Paragraph>
        </StyledComment>
        <Button>JOIN</Button>
      </DetailWrap>
    </Wrap>
  );
}

export default DetailContent;

DetailContent.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

DetailContent.defaultProps = {
  height: "78%",
  width: "100%",
};
