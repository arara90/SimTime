import React, { useState, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import PropTypes from "prop-types";


import DefaultModal from "../../../AtomicComponentsVer2/molecule/modal/DefaultModal"
import Label from "../../../AtomicComponentsVer2/atom/forms/Label"
import InputColor from "../../../AtomicComponentsVer2/atom/forms/InputColor"
import InputImage from "../../../AtomicComponentsVer2/atom/forms/InputImage"
import CalendarEventLabel from "../../../AtomicComponentsVer2/molecule/calendar/CalendarEventLabel"


import Input from "../../B-Molecules/Form/Input";
import TextArea from "../../B-Molecules/Form/TextArea";
import InputTag from "../../B-Molecules/Form/InputTag";
import InputTime from "../../B-Molecules/Form/InputTime";
import DatePicker from "../../D-Templates/Calendar/DatePicker";
import SearchLocation from "../../C-Organisms/Event/Create/SearchLocation";

import { getStrFullDate, getFullTime } from "../Calendar/Generator";
import { addEvent, getEvent, editEvent } from "../../../redux/actions/events";

import * as Colors from "../../Colors"

const ContentWrap = styled.form``
const PageWrap = styled.div`
  overflow: hidden;
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

const ColorLabel = styled(Label)`
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 38px; 
}
`
//height는 CalendarEventLabel의 button크기

const MyInputColor = styled(InputColor)`
    z-index: 9;
    width: 80%;
    opacity: 0;
`

const MyCalendarEventLabel = styled(CalendarEventLabel)`
  position: absolute;
  width: 80%;
  top:0;
  right: 0;
`

const ImageLabel = styled(Label)`
    display: flex;
    flex-direction: column;
}
`

const MyInputImage = styled(InputImage)`
  color : ${Colors.TEXT};
`


function EventMaker(props) {
  const palette = Object.values(Colors.Palette) ;
  const {closeModal, user, editEvent, addEvent, eventSubmitHandler, eventToEdit, isEdit } = props;
  const today = new Date();

  //states
  const [datePicker, setDatePicker] = useState(false);

  const [name, setName] = useState(isEdit ? eventToEdit.event_name : "");
  const [date, setDate] = useState(isEdit ? eventToEdit.event_date : "");
  const [time, setTime] = useState(isEdit ? eventToEdit.event_time : "");
  const [place, setPlace] = useState(isEdit ? eventToEdit.event_place : {});
  const [message, setMessage] = useState(isEdit ? eventToEdit.message :"");
  const [color, setColor] = useState( isEdit ? eventToEdit.color : palette[Math.floor(Math.random() * palette.length)], );
  const [ imgFile, setImgFile] = useState( isEdit ? eventToEdit.photo :null); //파일

  // //not yet
  const [tags, setTags] = useState([]);
  const [fontColor, setFontColor] = useState();

  const initEvent = {
    id: null,
    event_name: name,
    event_date: getStrFullDate(today, "yyyy-mm-dd"),
    event_time: time,
    event_place: place,
    tags: tags,
    message: message,
    host: user.id,
    photo: imgFile
  }
  const [event, setEvent] = useState( isEdit ? eventToEdit : initEvent);

  const showDatePicker = () => setDatePicker(!datePicker);

  const handleClick = () => {
    // e.preventDefault();
    const dt = new Date(date + " " + time)
    const currEvent = {
      host: user.id,
      event_name: name,
      event_date: date,
      event_time: getFullTime(dt),
      event_place: place,
      message: message,
      tags: tags,
      color: color,
      photo: imgFile
    };

    setEvent(currEvent);
  };

  const hadleSubmit = () => {
    // e.preventDefault();
    // e.stopPropagation();
    console.log('imgFile,', imgFile)
    eventSubmitHandler(event, imgFile)
  };


  //changeHandlers
  const nameChange = useCallback((e) => setName(e.target.value));
  const placeChange = useCallback((place) => setPlace(place));
  const changeDate = useCallback((strDate) => setDate(strDate));
  const changeTags = useCallback((tags) => setTags(tags));
  const changeTime = useCallback((time) => setTime(time));

  useEffect(() => {
    if(isEdit){
      const currEvent = {
        host: user.id,
        event_name: eventToEdit.event_name,
        event_date: eventToEdit.event_date,
        event_time: eventToEdit.event_time,
        event_place: eventToEdit.event_place,
        message: eventToEdit.message,
        tags: tags,
        color: color,
        photo: eventToEdit.photo,
      };
  
      setEvent(currEvent);
    }
  },[]);

  useEffect(() => {
  console.log('eventMaker', time)
  }, [time]);


  //pages
  const firstPage = () => {
    return (
      <PageWrap {...props} >
        <MyInput label="Event" name="eName" desc="Event Name" value={name} onChange={nameChange} />
        <PositionWrap>
          <MyDateInput name="eDate" label="Date" desc={date} value={date} readOnly={true} cursor="pointer" onClick={showDatePicker} />
          <MyDatePicker isShown={datePicker} selectDate={changeDate} selectedDate={date} onClose={()=>{setDatePicker(false);}} />
        </PositionWrap>
        <MyInputTime name="eTime" label="Time" cursor="pointer" changeTime={changeTime} time={time}/>
        <SearchLocation placeToEdit={isEdit?eventToEdit.event_place:null} name="ePlace" onChange={placeChange} />
      </PageWrap>
    );
  };

  const secondPage = () => {
    return (
      <PageWrap {...props} >
        <MyTextArea label="Message" name="eMessage" value={message} desc="1000자 이내" height="200px" maxLength={1000}
          onChange={(e)=>setMessage(e.target.value)} />
        <InputTag changeTags={changeTags} label="Tag" name="eTag" desc="Tag 입력"></InputTag>
      </PageWrap>
    );
  };
  
  const thirdPage =() => {
    return (
      <PageWrap {...props}>
          <ColorLabel htmlFor ="LabelColor"> Color
            <MyInputColor value={color} changeHandler={setColor} type="color" name="LabelColor"/> 
            <MyCalendarEventLabel color={color}
             title={name || user.username}
             time={time}
             location={place.name}
             host={user}
          /> 
          </ColorLabel>
          <ImageLabel htmlFor ="imgFile"> Photo
            <MyInputImage handleImageFile={setImgFile} src={imgFile}  />
          </ImageLabel>
      </PageWrap>
    );
  };


  return(
    //0128 <ContentWrap onSubmit={submitHandler} encType="multipart/form-data"> 
    // <ContentWrap onSubmit={submitHandler}>
      <DefaultModal
        title="New Event"
        pages={[firstPage(), secondPage(), thirdPage()]}
        pageChangeHandler={handleClick}
        handleSubmit={hadleSubmit}
        height="auto"
        closeModal={closeModal}
      />
    // </ContentWrap>
  )

}

const mapStateToProps = (state) => ({
  event: state.events.selectedEvent[0],
  user: state.auth.user,
  
});

const mapDispatchToProps = (dispatch)=> {
 return {
  addEvent: (myEvent)=>dispatch(addEvent(myEvent)),
  getEvent: getEvent(),
  editEvent: editEvent()
}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMaker);

// export default EventMaker;

EventMaker.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  selectedDate: PropTypes.string,
  event: PropTypes.object,
  isEdit: PropTypes.bool
};

EventMaker.defaultProps = {
  // height: "568px",
  height: "548px",
  width: "320px",
  selectedDate: null,
  event: {},
  isEdit: false
};




  // const handleChangeFile = (e) => {
  //   let reader = new FileReader();

  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //     setImgFile(e.target.files[0]); // 파일 상태 업데이트
  //   }

  //   reader.onload = () => {
  //     var preview = new Image();      
  //     var base64 = reader.result;

  //     if (base64) {
  //       setImgBase64(base64);
  //       preview.src = base64;
      
  //       preview.onload = () => {
  //         var w = preview.width;
  //         var h = preview.height;
  //         console.log(w>h)
  //         setIsLandscape(w>h)
  //       }
  //     }
  //   };
  // };
  // const thirdPage = () => {
  //   let profile_preview = null;
  //   if (imgBase64 !== "") {


  //     profile_preview = (
  //       <img className="profile_preview" src={imgBase64.toString()} style={{width:"100%"}} />
  //     );
  //   }

  //   return (
  //     <PageWrap {...props} isActivePage={page == 2}>
  //         <ColorLabel htmlFor ="LabelColor"> Color
  //           <MyInputColor value={color} changeHandler={setColor} type="color" name="LabelColor"/> 
  //           <MyCalendarEventLabel color={color}
  //            title={name || user.username}
  //            time={time}
  //            location={place.name}
  //            host={user}
  //         /> 
  //         </ColorLabel>
          
  //         <ImageLabel htmlFor ="imgFile"> Photo
  //           <input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile} /> 
  //           <div>{profile_preview}</div>
  //         </ImageLabel>
          
  //     </PageWrap>
  //   );
  // };

  // const handleClickColorBtn  = (event) => {
  //   console.log('handleClickColorBtn');
  // };
  // useEffect(() => {
  //   // window.addEventListener('click', handleClickColorBtn);

  //   // // cleanup this component
  //   // return () => {
  //   //   window.removeEventListener('click', handleClickColorBtn);
  //   // };

  //   console.log('imgRef,' )
  //   console.log(imgRef )
  // });
