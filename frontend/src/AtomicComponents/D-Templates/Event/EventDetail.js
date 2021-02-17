import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {MAIN_COLOR} from '../../Colors'
import DetailTitle from '../../C-Organisms/DetatilTitle'
import DetailContent from '../../C-Organisms/DetailContent'

const Wrap = styled.div`
    border : solid 1px ${MAIN_COLOR};
    width: ${props=> props.width};
    height: ${props=> props.height};
    
    display : flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 920px) {
        width: 100%;
    }
`

function EventDetail(props) {
    return (
        <Wrap {...props}>
            <DetailTitle />
            <DetailContent/>
        </Wrap>
    )
}

export default EventDetail

EventDetail.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
  };

EventDetail.defaultProps = {
    height: "618px",
    width: "100%",
};
  
