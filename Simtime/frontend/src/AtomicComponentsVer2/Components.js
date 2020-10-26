import React from 'react'
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


const Level = styled.section`
    margin-top: 30px;
`
const Wrap = styled.div`
    margin-top: 20px;
`

const Items = styled.div`
display: flex;
justify-content: space-around;
`

function Components() {
    return (
        <div>
        <Level>
            <h1>Atomic</h1>
            <Wrap>
                <h2> Icons</h2>
                <Items>
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
                </Items>
            </Wrap>
            
            <Wrap>
                <h2> Buttons</h2>
                <Items>
                    <BorderButton>BorderButton</BorderButton>
                    <SolidButton>SolidButton</SolidButton>
                    <IconButton><HeartIcon /></IconButton>
                </Items>
            </Wrap>

            <Wrap>
                <h2> FORMS</h2>
                <Items>
                    <BorderButton>BorderButton</BorderButton>
                    <SolidButton>SolidButton</SolidButton>
                    <IconButton><HeartIcon /></IconButton>
                </Items>
            </Wrap>
        </Level>


        </div>
    )
}

export default Components
