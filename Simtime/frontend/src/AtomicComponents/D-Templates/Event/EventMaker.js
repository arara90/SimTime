import React, { useState, useCallback, Fragment, useRef } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import PropTypes from "prop-types";

import { addEvent, getEvent, editEvent } from "../../../actions/events";
import { MAIN_COLOR, ST_GTAY } from "../../Colors";

import ModalTitle from "../../A-Atomics/Modal/ModalTitle";
import ProgressBar from "../../A-Atomics/Deco/ProgressBar";
import InputWrap from "../../A-Atomics/Form/InputWrap";
import Input from "../../B-Molecules/Form/Input";
import TextArea from "../../B-Molecules/Form/TextArea";

import InputTag from "../../B-Molecules/Form/InputTag";
import InputTime from "../../B-Molecules/Form/InputTime";
import DatePicker from "../../D-Templates/Calendar/DatePicker";
import TimePicker from "../../D-Templates/Calendar/TimePicker";
import SearchBar from "../../B-Molecules/Form/SearchBar";
import SearchLocation from "../../C-Organisms/Event/Create/SearchLocation";
import Map from "../../A-Atomics/Map/Map";

import DashedButton from "../../A-Atomics/Button/DashedButton";
import { getStrFullDate } from "../Calendar/Generator";

import ContextStore from "../../../contexts/contextStore";

const Wrap = styled.div`
  border: solid 1px ${MAIN_COLOR};
  background-color: white;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 320px) {
    width: 100%;
  }
`;

const HeaderWrap = styled.div`
  width: 100%;
  // height: 18%;
  height: 14%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow: hidden;
`;

const BarWrap = styled.div`
  width: 92%;
  height: 10%;
  // min-height: 50px;
  min-height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.form`
  width: 90%;
  // height: 82%;
  height: 84%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const FormWrap = styled.div`
  width: 100%;
  height: 85%;
  // border: solid 1px blue;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const PageWrap = styled.div`
  // border: solid 1px red;
  width: 100%;
  ${(props) =>
    props.isActivePage
      ? `display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;`
      : `display:none;`}
`;

const MyInput = styled(Input)`
  margin-bottom: 15px;
`;

const MyTextArea = styled(TextArea)`
  margin-bottom: 15px;
`;
const MyInputTime = styled(InputTime)`
  margin-bottom: 15px;
`;

const MyDateInput = styled(Input)`
  margin-bottom: 15px;
`;

const PositionWrap = styled.div`
  width: 100%;
  position: relative;
`;

const MyDatePicker = styled(DatePicker)`
  ${(props) =>
    props.isShown
      ? `  
      width: 100%;
      background-color: white;
      position: absolute;
      top: 45px;
      right: 0px;`
      : "display: none;"}
`;

const MySearchBar = styled(SearchBar)`
  margin-bottom: 15px;
`;

const Buttons = styled.div`
  width: 100%;
  height: 15%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrap = styled.div`
  cursor: pointer;
  width: ${(props) => props.width};
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMap = styled(Map)``;

const Button = styled(DashedButton)`
  border-radius: 6px;
`;

function EventMaker(props) {
  const today = new Date();
  const timeRef = useRef();
  const [datePicker, setDatePicker] = useState(false);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [image, setImage] = useState(null); //파일

  const [event, setEvent] = useState({
    eId: null,
    eName: "",
    eDate: getStrFullDate(today, "yyyy-mm-dd"),

    ePlace: { lat: 0, lng: 0, name: "unknown" },
    eMessage: "",
    eStatus: "CLOSED",
    eHost_id: "unknown",
  });

  const showDatePicker = () => {
    setDatePicker(!datePicker);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // var event_at = new Date('2019/5/16/17:24:30:10');
    console.log(image);

    const { eId, eName, eDate, eStatus, eMessage, ePlace } = event;
    const myEvent = {
      host: props.user.id,
      event_name: name,
      //"2020-06-19T20:00"
      event_time: date + "T" + time.split(" ")[0],
      status: eStatus,
      event_place: place,
      message: message,
      // photo: image,
    };

    if (props.event) {
      props.editEvent({
        id: eId,
        ...myEvent,
      });
    } else {
      console.log("check: ", myEvent);
      props.addEvent(myEvent, image);
    }

    // props.closeModal();
  };

  const handleChangeFile = (e) => {
    let reader = new FileReader();
    console.log("hc");

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      console.log("hc2");
      const base64 = reader.result;
      if (base64) {
        console.log("hc3");
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (e.target.files[0]) {
      console.log("hc4", e.target.files);
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImage(e.target.files[0]); // 파일 상태 업데이트
    }
  };

  const nameChange = useCallback((e) => {
    setName(e.target.value);
  });

  const placeChange = useCallback((place) => {
    // setEvent({ ...event, ePlace: location });
    setPlace(place);
  });

  const changeDate = useCallback((strDate) => {
    setDate(strDate);
  });

  const changeTime = useCallback((time) => {
    setTime(time);
  });

  const firstPage = () => {
    return (
      <PageWrap {...props} isActivePage={page == 0}>
        <MyInput
          label="Event"
          name="eName"
          desc="Event Name"
          value={name}
          onChange={nameChange}
        />
        <PositionWrap>
          <MyDateInput
            name="eDate"
            label="Date"
            desc={date}
            value={date}
            readOnly={true}
            cursor="pointer"
            onClick={showDatePicker}
          ></MyDateInput>
          {console.log(date)}
          <MyDatePicker
            isShown={datePicker}
            selectDate={changeDate}
            selectedDate={date}
            onClose={() => {
              setDatePicker(false);
            }}
          />
        </PositionWrap>
        <MyInputTime
          name="eTime"
          label="Time"
          cursor="pointer"
          changeTime={changeTime}
        />
        {/* <MyInput label="Location" name="eLocation" desc="Search Location" /> */}
        <SearchLocation name="ePlace" onChange={placeChange} />
      </PageWrap>
    );
  };

  const secondPage = () => {
    return (
      <PageWrap {...props} isActivePage={page == 1}>
        <MyTextArea
          label="Message"
          name="eMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          desc="1000자 이내"
          height="200px"
          maxLength={1000}
        />
        <InputTag label="Tag" name="eTag" desc="Tag 입력"></InputTag>
      </PageWrap>
    );
  };

  const thirdPage = () => {
    let profile_preview = null;
    if (imgBase64 !== "") {
      profile_preview = (
        <img
          className="profile_preview"
          src={imgBase64}
          style={{
            width: "150px",
            height: "150px",
          }}
        ></img>
      );
    }
    return (
      <PageWrap {...props} isActivePage={page == 2}>
        <div>
          <input
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={handleChangeFile}
          />
        </div>
        <div
          style={{
            width: "150px",
            height: "150px",
          }}
        >
          {profile_preview}
        </div>
      </PageWrap>
    );
  };

  const handleClick = (e, targetPage) => {
    e.preventDefault();
    console.log("event: ", event);
    const { eId, eName, eDate, eStatus, eMessage, ePlace } = event;
    const host = props.user.id;

    setEvent({
      ...event,
      eName: name,
      eDate: new Date(date.replace(/-/gi, "/") + "/" + time.split(" ")[0]),
      eMessage: message,
      ePlace: place,
      eImage: image,
    });

    setPage(targetPage);
  };

  const renderButtons = (page) => {
    console.log("ggg");
    switch (page) {
      case 0:
        return (
          <ButtonWrap width="100%">
            <Button onClick={(e) => handleClick(e, page + 1)}>Next</Button>
          </ButtonWrap>
        );

      case 2:
        return (
          <Fragment>
            <ButtonWrap width="48%">
              <Button onClick={(e) => handleClick(e, page - 1)}>Prev</Button>
            </ButtonWrap>
            <ButtonWrap width="48%">
              <Button type="submit">Done</Button>
            </ButtonWrap>
          </Fragment>
        );

      default:
        return (
          <Fragment>
            <ButtonWrap width="48%">
              <Button onClick={(e) => handleClick(e, page - 1)}>Prev</Button>
            </ButtonWrap>
            <ButtonWrap width="48%">
              <Button onClick={(e) => handleClick(e, page + 1)}>Next</Button>
            </ButtonWrap>
          </Fragment>
        );
    }
  };

  return (
    <ContextStore.Provider value={date}>
      <Wrap {...props}>
        <HeaderWrap>
          <BarWrap>{/* <ProgressBar /> */}</BarWrap>
          <ModalTitle>EVENT</ModalTitle>
        </HeaderWrap>

        <ContentWrap onSubmit={handleSubmit} encType="multipart/form-data">
          {firstPage()}
          {secondPage()}
          {thirdPage()}
          <Buttons>{renderButtons(page)}</Buttons>
        </ContentWrap>
      </Wrap>
    </ContextStore.Provider>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.selectedEvent[0],
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  addEvent,
  getEvent,
  editEvent,
})(EventMaker);

// export default EventMaker;

EventMaker.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  selectedDate: PropTypes.string,
};

EventMaker.defaultProps = {
  // height: "568px",
  height: "548px",
  width: "320px",
  selectedDate: null,
};
