import React, { useState, useCallback, Fragment, useRef } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import PropTypes from "prop-types";

import DefaultModal from "../../../AtomicComponentsVer2/molecule/modal/DefaultModal"

import Input from "../../B-Molecules/Form/Input";
import TextArea from "../../B-Molecules/Form/TextArea";
import InputTag from "../../B-Molecules/Form/InputTag";
import InputTime from "../../B-Molecules/Form/InputTime";
import DatePicker from "../../D-Templates/Calendar/DatePicker";
import SearchLocation from "../../C-Organisms/Event/Create/SearchLocation";

import DashedButton from "../../A-Atomics/Button/DashedButton";
import { getStrFullDate } from "../Calendar/Generator";
import { addEvent, getEvent, editEvent } from "../../../actions/events";

const ContentWrap = styled.form``

const PageWrap = styled.div`
  height: 26em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MyInput = styled(Input)`margin-bottom: 15px;`;

const MyTextArea = styled(TextArea)` margin-bottom: 15px;`;
const MyInputTime = styled(InputTime)`margin-bottom: 15px;`;
const MyDateInput = styled(Input)`margin-bottom: 15px;`;
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

const ButtonWrap = styled.div`
  cursor: pointer;
  width: ${(props) => props.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled(DashedButton)`border-radius: 6px;`;

function EventMaker(props) {
  const {closeModal, user, editEvent, addEvent, } = props;

  const today = new Date();
  const timeRef = useRef();
  const [datePicker, setDatePicker] = useState(false);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState({});
  const [tags, setTags] = useState(null);
  const [message, setMessage] = useState("");

  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [image, setImage] = useState(null); //파일

  const [event, setEvent] = useState({
    eId: null,
    eName: "",
    eDate: getStrFullDate(today, "yyyy-mm-dd"),
    ePlace: { lat: 0, lng: 0, name: "unknown" },
    eTags: [],
    eMessage: "",
    eStatus: "CLOSED",
    eHost_id: "unknown",
    
  });

  const showDatePicker = () => setDatePicker(!datePicker);

  const handleSubmit = async (e) => {

    try{
        const e_time = new Date(date + " " + time.split(" ")[0])
        e.preventDefault();
        // var event_at = new Date('2019/5/16/17:24:30:10');
        const { eId, eStatus } = event;
        const myEvent = {
          host: user.id,
          event_name: name,
          event_time: e_time.toISOString(),
          // event_time: new Date(date + " " + time.split(" ")[0]).getTime(),
          status: eStatus,
          event_place: place,
          message: message,
          tags: tags
          // photo: image,
        };

        if (props.event)  editEvent({id: eId,...myEvent,});
        else  addEvent(myEvent, image);

        // closeModal();
        props.submitHandler();

    }
    catch (err) { console.log("relationshipError", err); }
  };

  const handleChangeFile = (e) => {
    let reader = new FileReader();

    // 2. 읽기가 완료되면 아래코드가 실행됩니다.
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImage(e.target.files[0]); // 파일 상태 업데이트
    }
  };


  //changeHandlers
  const nameChange = useCallback((e) => setName(e.target.value));
  const placeChange = useCallback((place) => setPlace(place));
  const changeDate = useCallback((strDate) => setDate(strDate));
  const changeTags = useCallback((tags) => setTags(tags));
  const changeTime = useCallback((time) => {
    setTime(time);
    console.log(time)
  });


  //pages
  const firstPage = () => {
    return (
      <PageWrap {...props} >
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
           />
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
      <PageWrap {...props} >
        <MyTextArea
          label="Message"
          name="eMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          desc="1000자 이내"
          height="200px"
          maxLength={1000}
        />
        <InputTag changeTags={changeTags} label="Tag" name="eTag" desc="Tag 입력"></InputTag>
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

  const handleClick = () => {
    // e.preventDefault();
    const { eId, eName, eDate, eStatus, eMessage, ePlace } = event;
    const host = user.id;

    setEvent({
      ...event,
      eName: name,
      eDate: new Date(date.replace(/-/gi, "/") + "/" + time.split(" ")[0]),
      eMessage: message,
      ePlace: place,
      eImage: image,
    });

    // setPage(targetPage);
  };

  const renderButtons = (page) => {
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

  return(
    <ContentWrap onSubmit={handleSubmit} encType="multipart/form-data">
      <DefaultModal
        title="New Event"
        pages={[firstPage(),secondPage(), thirdPage() ]}
        totalPage={3}
        handleSubmit={handleSubmit}
        pageChangeHandler={handleClick}
        height="auto"
        closeModal={closeModal}
      />
    </ContentWrap>
  )

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





///////////////////Legacy//////////////////
  // return (
  //     <Wrap {...props}>
  //       <HeaderWrap>
  //         <BarWrap>{/* <ProgressBar /> */}</BarWrap>
  //         <ModalTitle >EVENT</ModalTitle>
  //       </HeaderWrap>

  //       <ContentWrap onSubmit={handleSubmit} encType="multipart/form-data">
  //         {firstPage()}
  //         {secondPage()}
  //         {thirdPage()}
  //         <Buttons>{renderButtons(page)}</Buttons>
  //       </ContentWrap>
  //     </Wrap>
    
  // );
  
  // const handleSubmit = async () => {
  //   try {
  //     //친구 등록
  //     var relationship = await props.addfriend( {account: props.user.id, friend: friend[0],});
  //     console.log(relationship)
  //     if(groups.length){
  //       var groupData = groups.map((group) => {
  //         return { relationship: relationship.data.relationshipId, group: group };
  //       });
  //       await props.addToGroup(groupData);
  //     }

  //     props.closeModal();
  //   } catch (err) {
  //     console.log("relationshipError", err);
  //   }
  // };


