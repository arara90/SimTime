import React, { Fragment, useCallback, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_SEMI_YELLOW,
  ST_SEMI_GRAY,
  ST_WHITE,
} from "../../Colors";

import TableRow from "../../A-Atomics/Table/TableRow";
import Image from "../../A-Atomics/Image";

const selectedStyle = {
  backgroundSize: "14px",
  backgroundRepeat: "no-repeat",
  backgroundImage:
    "url(https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/img/icons/check.png)",
  backgroundPosition: "92% center",
};

function SelectTable(props) {
  const [selectedOption, setSelectedOption] = useState(props.defaultOption);
  var selectionFilter = [];

  const handleClick = (d) => {
    console.log(d);
  };

  let fn = (child) => {
    console.log(child.key, selectedOption);

    var style =
      child.key == selectedOption
        ? { ...child.props.style, ...selectedStyle }
        : null;

    //Filter
    selectionFilter.push(child.key == selectedOption);
    console.log("selectionFilter : ", selectionFilter);

    return React.cloneElement(child, {
      style,
      isSelected: child.key == selectedOption,
      onClick: (e) => {
        e.preventDefault();
        setSelectedOption(child.key);
      },
    });
  };

  return <Fragment>{React.Children.map(props.children, fn)}</Fragment>;
}

export default SelectTable;

SelectTable.propTypes = {
  defaultOption: PropTypes.number,
  datas: PropTypes.array,
};

SelectTable.defaultProps = {
  defaultOption: 0,
  datas: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
};
