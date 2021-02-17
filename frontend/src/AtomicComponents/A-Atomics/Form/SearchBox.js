import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";
import Paragraph from "../Font/Paragraph";

import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_SEMI_YELLOW,
  ST_SEMI_GRAY,
  ST_GRAY,
} from "../../Colors";

const Wrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
`;

const Select = styled.input`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  padding-left: 4px;
  padding-right: 30px;
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  line-height: ${(props) => props.height};

  font-size: 15px;
  font-weight: 400;

  cursor: ${(props) => props.cursor};

  ${(props) =>
    props.isValid
      ? `  
  background-size: 18px;
  background-repeat: no-repeat;
  background-image: url("https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/check-valid.png");
  background-position: 94% center;`
      : null};

  ::placeholder {
    color: ${ST_GRAY};
    font-size: 15px;
    font-weight: 300;
  }
`;

//////////// css로 구현////////
//  display: none;
// ${Select}:focus ~ & {
//   display: block;
// }

const OptionWrap = styled.div`
  padding: 1px 1px 1px 1px;
  background-color: white;

  ${(props) => (props.showOptions ? null : "display: none")};

  width: ${(props) => props.width};
  height: ${(props) => props.contentHeight};
  min-height: ${(props) => props.minHeight};
  max-height: 160px;

  position: absolute;
  top: ${(props) => props.top};
  left: 0px;

  font-size: 15px;
  font-weight: 400;
  z-index: 9999;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${ST_SEMI_YELLOW};
    border-radius: 10px;

    &:hover {
      background-color: ${ST_GRAY};
    }
  }

  &::-webkit-scrollbar-track {
    background-color: ${ST_SEMI_GRAY};
    border-radius: 5px;
    box-shadow: inset 0px 0px 3x white;
  }
`;

const Option = styled.div`
  width: 100%;
  height: ${(props) => props.height};

  padding-left: 4px;
  padding-right: 4px;

  ${(props) =>
    props.isActive
      ? ` &:hover {
    background-color: ${ST_YELLOW_LIGHT};
    cursor: pointer;
  }`
      : "cursor: default;"};
`;

const OptionName = styled.div`
  width: 100%;
  height: ${(props) => props.height};

  font-size: 15px;
  font-weight: 400;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const OptionDesc = styled.div`
  width: 100%;
  height: 45%;
  font-size: 10px;

  padding-left: 2px;
  padding-right: 2px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MyParagraph = styled(Paragraph)``;

function SearchBox(props) {
  const {
    width,
    height,
    defaultOption,
    options,
    name,
    desc,
    arrow,
    cursor,
    search,
    doAfterSelect,
    refName,
  } = props;

  const [optionDatas, setOptionDatas] = useState(options);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [currInput, setCurrInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const startSearch = (keyword) => {
    return new Promise(function (resolve, reject) {
      resolve(search(keyword));
    });
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      startSearch(e.target.value).then((resolvedData) => {
        setOptionDatas(resolvedData.items);
      });
    }
  };

  const handleChange = (e) => {
    var val = e.target.value;
    // setMyValue(e.target.value);
    setCurrInput(e.target.value);
    setIsValid(false);

    if (val.length > 0) {
      startSearch(val)
        .then((resolvedData) => {
          setOptionDatas(resolvedData.items);
        })
        .then(() => {
          setShowOptions(true);
        });
    } else {
      setShowOptions(false);
    }
  };

  const changeShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const changeSelectedOptions = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    setCurrInput(option.name);
    setIsValid(true);
    doAfterSelect(option);
    console.log(option);
  };

  const renderOptions = (options) => {
    var contentHeight =
      parseInt(height.replace(/[^0-9]/g, "")).toFixed(0) *
        (options.length || 1) +
      2;
    return (
      <OptionWrap
        width={width}
        top={height}
        showOptions={showOptions}
        minHeight={height}
        contentHeight={contentHeight + "px"}
      >
        {options.length ? (
          optionDatas.map((option) => {
            return (
              <Option
                key={option.id + option.name}
                height={height}
                isActive={true}
                isSelected={option.id === selectedOption}
                onClick={() => changeSelectedOptions(option)}
              >
                <OptionName height={option.desc ? "55%" : "100%"}>
                  <MyParagraph>{option.name}</MyParagraph>
                </OptionName>
                {option.desc ? (
                  <OptionDesc>
                    <MyParagraph fontSize="12px" color="ST_GRAY">
                      {option.desc}
                    </MyParagraph>
                  </OptionDesc>
                ) : null}
              </Option>
            );
          })
        ) : (
          <Option height={height} isActive={false}>
            <OptionName height="100%">
              <MyParagraph>해당하는 결과가 없습니다.</MyParagraph>
            </OptionName>
          </Option>
        )}
      </OptionWrap>
    );
  };

  return (
    <Wrap {...props}>
      <Select
        ref={refName}
        type="text"
        autoComplete="off"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onClick={changeShowOptions}
        width={width}
        height={height}
        name={name}
        placeholder={desc}
        arrow={arrow}
        cursor={cursor}
        value={currInput}
        isValid={isValid}
      />
      {renderOptions(optionDatas)}
    </Wrap>
  );
}

export default SearchBox;

SearchBox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.array,
  defaultOption: PropTypes.object,
  arrow: PropTypes.bool,
  cursor: PropTypes.string,
};

SearchBox.defaultProps = {
  width: "100%",
  height: "100%",
  options: [{ id: 0, name: "", desc: "" }],
  defaultOption: null,
  arrow: false,
  cursor: "pointer",
};
