import React, {createRef, useRef} from 'react'
import styled from "styled-components";

import BorderButton from "./atom/buttons/BorderButton"
import SolidButton from "./atom/buttons/SolidButton"
import IconButton from "./atom/buttons/IconButton"

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

const Level = styled.section`
    margin-top: 30px;
`
const Wrap = styled.div`
    margin-top: 30px;
`

const ItemsRow = styled.div`
    display: flex;
    justify-content: space-between;
`


const ItemsColumn = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

function Components() {
    const inputRef = createRef();
    const selectRef = createRef();
    // const fancyInputRef = useRef();
    // const focus = () => {
    //     fancyInputRef.current.focus()
    //   } 

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
            <h1>Atomic</h1>
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
                    <BorderButton>BorderButton</BorderButton>
                    <SolidButton>SolidButton</SolidButton>
                    <IconButton><HeartIcon color="MAIN_COLOR" /></IconButton>
                </ItemsRow>
            </Wrap>

            <Wrap>
                <h2> Forms</h2>
                <ItemsColumn>
                    <Input placeholder="Input" enterHandler={enterHandler}/>
                    <InputRef placeholder="InputRef" ref={inputRef} changeHandler={changeHandler} />
                    {/* <FancyInput ref={fancyInputRef} />
                    <button onClick={focus}>Fancy Click</button> */}
                    <br />
                    <Select defaultOption="select1"></Select>
                    <SelectRef defaultOption="select2" ref={selectRef}></SelectRef>
                </ItemsColumn>
            </Wrap>
        </Level>


        </div>
    )
}

export default Components
