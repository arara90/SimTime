import React, {createRef, useRef, useEffect, useState} from 'react'
import styled from "styled-components";

import * as Colors from "./Colors"
import BorderButton from "./atom/buttons/BorderButton"
import SolidButton from "./atom/buttons/SolidButton"
import IconButton from "./atom/buttons/IconButton"
import StatusButton from "./atom/buttons/StatusButton"

import AngleIcon                from "./atom/icons/AngleIcon"
import BellIcon                 from "./atom/icons/BellIcon"
import CalendarIcon             from "./atom/icons/CalendarIcon"
import CaretIcon                from "./atom/icons/CaretIcon"
import CheckCircleIcon          from "./atom/icons/CheckCircleIcon"
import CheckIcon                from "./atom/icons/CheckIcon"
import ChevronCircle            from "./atom/icons/ChevronCircle"
import ChevronIcon              from "./atom/icons/ChevronIcon"
import CloseIcon                from "./atom/icons/CloseIcon"
import ExclamationTriangleIcon  from "./atom/icons/ExclamationTriangleIcon"
import FilterIcon               from "./atom/icons/FilterIcon"
import HeartIcon                from "./atom/icons/HeartIcon"
import ImageIcon                from "./atom/icons/ImageIcon"
import MapMarkerIcon            from "./atom/icons/MapMarkerIcon"
import PlusIcon                 from "./atom/icons/PlusIcon"
import PlusCircleIcon           from "./atom/icons/PlusCircleIcon"
import SearchIcon               from "./atom/icons/SearchIcon"
import StarIcon                 from "./atom/icons/StarIcon"
import UploadIcon               from "./atom/icons/UploadIcon"

import Input, {InputRef} from "./atom/forms/Input"
import FancyInput from "./atom/forms/NotInUse/FancyInput"
import Select, {SelectRef} from "./atom/forms/Select"
import TextArea, {TextAreaRef} from "./atom/forms/TextArea"

import DetailTextRow from "./atom/DetailTextRow"

//molecule
import CalendarHeader from "./molecule/calendar/CalendarHeader"
import EventListItem from "./molecule/event/EventListItem"
import CalendarEventLabel from "./molecule/calendar/CalendarEventLabel"
import UserCard from "./molecule/UserCard"

import EventDetailHeader from './molecule/event/EventDetailHeader';
import EventDetailContent from './molecule/event/EventDetailContent';

//organism
import EventDetail from "./organism/calendar/event/EventDetail"
import EventList from "./organism/calendar/event/EventList"

const palette = Colors.Palette;

const Level = styled.section`
    margin-top: 30px;
`

const H = styled.h1`
    font-weight: bold;
`
const Wrap = styled.div`
    margin-top: 30px;
`
const ItemsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`
const ItemsColumn = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const LabelWrap = styled.section`
    width: 115px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
function Components() {
    const inputRef = createRef();
    const selectRef = createRef();
    const [curr, setCurr] = useState(new Date());
    // const fancyInputRef = useRef();
    // const focus = () => {
    //     fancyInputRef.current.focus()
    //   } 

    useEffect(
        ()=>{
            window.addEventListener("click", closeHandler);
            return () => {
              window.removeEventListener("click", closeHandler);
            };
        }
    )
   
     
    const closeHandler = (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const selects = document.querySelectorAll(".select-styled")
          const optionBoxes = document.querySelectorAll(".select-options")

          selects.forEach(select => {
            select.classList.remove("open")
          });
          optionBoxes.forEach(option => {
            option.classList.add("hide")            
          });

      }

    const enterHandler=(v)=>{
        console.log(v)
        inputRef.current.focus()
    }

    const changeHandler=(v)=>{
        console.log(v)
    }

    return (
        <div>
            <Level>
                <H>Organisms</H>
                <hr />
                <Wrap className="molecule-calendar">
                    <h2> Event</h2>
                    <ItemsColumn>
                        <ItemsRow>
                            <EventDetail />
                            <EventList current={curr} prevHandler={setCurr} nextHandler={setCurr} />
                        </ItemsRow>
                        <ItemsRow>
                            
                        </ItemsRow>
                    </ItemsColumn>
                </Wrap>
                
                <Wrap>
                    <h2>Etc</h2>
                    <ItemsRow>
        
                    </ItemsRow>
                </Wrap>
            </Level>

            <Level>
                <H>Molecules</H>
                <hr />
                <Wrap className="molecule-calendar">
                    <h2> Calendar</h2>
                    <ItemsColumn>
                    <ItemsRow>
                        <CalendarHeader 
                        current={curr}
                        type="date" 
                        prevHandler={setCurr}
                        nextHandler={setCurr}
                        />
                        <LabelWrap>
                            <CalendarEventLabel join isSolid color={palette[Math.floor(Math.random() * palette.length)]}/>
                            <CalendarEventLabel  color={palette[Math.floor(Math.random() * palette.length)]}/>
                            <CalendarEventLabel isSolid join color={palette[Math.floor(Math.random() * palette.length)]}/>
                        </LabelWrap>
                    </ItemsRow>

                    </ItemsColumn>
                </Wrap>
                
                <Wrap>
                    <h2>Event </h2>
                    <ItemsRow>
                        <ItemsColumn>
                            <EventListItem />
                            <EventListItem />
                            <EventListItem />
                        </ItemsColumn>
                        <ItemsColumn>
                            <EventDetailHeader />
                            <EventDetailContent />
                        </ItemsColumn>
                    </ItemsRow>
                </Wrap>

                <Wrap>
                    <h2>Etc</h2>
                    <ItemsRow>
                        <UserCard></UserCard>
                    </ItemsRow>
                </Wrap>
            </Level>

            <Level>
                <H>Atomic</H>
                <hr />
                <Wrap>
                    <h2> Icons</h2>
                    <ItemsRow>
                        <AngleIcon />
                        <BellIcon />
                        <CalendarIcon  />
                        <CaretIcon />
                        <CheckCircleIcon />
                        <CheckIcon />
                        <ChevronCircle />
                        <ChevronIcon />
                        <CloseIcon />
                        <ExclamationTriangleIcon />
                        <FilterIcon />
                        <HeartIcon />
                        <ImageIcon />
                        <MapMarkerIcon />
                        <PlusIcon />
                        <PlusCircleIcon />
                        <SearchIcon />
                        <StarIcon />
                        <UploadIcon />
                    </ItemsRow>
                </Wrap>
                
                <Wrap>
                    <h2> Buttons</h2>
                    <ItemsRow>
                        <BorderButton width="30%">BorderButton</BorderButton>
                        <SolidButton width="30%">SolidButton</SolidButton>
                        <IconButton><HeartIcon color="MAIN_COLOR" /></IconButton>
                        <StatusButton color="ST_PINK"><HeartIcon /></StatusButton>
                    </ItemsRow>
                </Wrap>


                <Wrap>
                    <h2> Forms</h2>
                    <ItemsColumn>
                        <Input placeholder="Input" enterHandler={enterHandler}/>
                        <br/>
                        <InputRef placeholder="InputRef" ref={inputRef} changeHandler={changeHandler} />
                        {/* <FancyInput ref={fancyInputRef} />
                        <button onClick={focus}>Fancy Click</button> */}
                        <br />
                        <Select defaultOption="select1"></Select>
                        <br/>
                        <SelectRef defaultOption="select2" ref={selectRef}></SelectRef>
                        <br/>
                        <TextArea></TextArea>
                    </ItemsColumn>
                </Wrap>


                <Wrap>
                    <h2> ETC</h2>
                    <ItemsColumn>
                    <DetailTextRow as="address"> DetailTextRow </DetailTextRow>
                    <DetailTextRow as="time"> DetailTextRow </DetailTextRow>
                    </ItemsColumn>
                </Wrap>
            </Level>
        </div>
    )
}

export default Components
