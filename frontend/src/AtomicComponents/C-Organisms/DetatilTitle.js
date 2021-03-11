import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {MAIN_COLOR} from '../Colors'
import Header from '../A-Atomics/Font/Header'
import Paragraph from '../A-Atomics/Font/Paragraph'
import UserCard from '../B-Molecules/User/UserCard'
import Image from "../A-Atomics/Image"

const Wrap = styled.div`
    position: relative;

    border-bottom : solid 1px ${MAIN_COLOR};
    width: ${props=> props.width};
    height: ${props=> props.height};

    display : flex;
    flex-direction : column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px 4px 8px 8px;
    @media only screen and (max-width: 920px) {
        width: 100%;
    }
`

const UpsideWrap = styled.div`
    display : flex;
    flex-direction : row;
    justify-contens: flex-start;
    margin-bottom : 8px;
    width: 100%;

`

const TitleTextWrap = styled.div`
    width: 80%;
`
const TitleImageWrap = styled.div`
    width: 20%;

    ${props => props.imgType=="label" ? 
            `position: absolute;
            top: 0px;
            right: 0px;
            display : flex;
            justify-content: center;
            `
        : `
            display : flex;
            justify-content: center;
            align-items: center;
        `
    }

    
`
const TitleWrap = styled.div`
    padding-bottom : 4px;
    display : flex;
    flex-direction : row;
    justify-contens: flex-start;
`
const Title = styled(Header)`
`

const TagsWrap = styled.div`
    height: 38px;
    padding-left: 10px;
    overflow: hidden;

`
const Tag = styled(Paragraph)`
    padding-right: 3px;
`
const TitleImage = styled(Image)``


const DownsideWrap = styled.div`
    display : flex;
    flex-direction : row;
    justify-contens: flex-start;
`
const UserCardWrap = styled.div`
`

function DetailTitle(props) {

    // const renderTags = () => {
    //     return tags.map((tag, index) => {
    //       return (
    //       <Tag key={tag.id} type="tag">{tag.value}</Tag>
    //       );
    //     });
    //   };

    return (
        <Wrap {...props}>
            <UpsideWrap>
                <TitleTextWrap>
                    <TitleWrap>
                        <Title type="h3" color="MAIN_COLOR">Tremblant in Canada</Title>
                    </TitleWrap>
                    <TagsWrap>
                        <Tag type="tag">#치맥</Tag>
                        <Tag type="tag">#한강</Tag>
                        <Tag type="tag">#나들이</Tag>
                        <Tag type="tag">#치맥</Tag>
                        <Tag type="tag">#한강</Tag>
                        <Tag type="tag">#나들이</Tag>
                        <Tag type="tag">#치맥</Tag>
                        <Tag type="tag">#한강</Tag>
                        <Tag type="tag">#나들이</Tag>
                        <Tag type="tag">#치맥</Tag>
                        <Tag type="tag">#한강</Tag>
                        <Tag type="tag">#나들이</Tag>
                    </TagsWrap>
                </TitleTextWrap>

                <TitleImageWrap>
                    <TitleImage width="40px" height="40px"/>
                </TitleImageWrap>

            </UpsideWrap>
            <DownsideWrap>
                <UserCardWrap>
                    <UserCard imageSize="35px"/>
                </UserCardWrap>
            </DownsideWrap>
        </Wrap>
    )
}

export default DetailTitle

DetailTitle.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
  };

DetailTitle.defaultProps = {
    height: "21%",
    width: "100%",
};

