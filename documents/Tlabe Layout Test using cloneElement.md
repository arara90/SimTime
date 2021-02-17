```react
import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TableRow from "../../../A-Atomics/Table/TableRow";
import Table from "../../../B-Molecules/Table/Table";
import SelectTable from "../../../B-Molecules/Table/SelectTable";
import UserCardForList from "../../../B-Molecules/User/UserCardForList";

const Row = styled(TableRow)`
  cursor: pointer;
`;
const UserCard = styled(UserCardForList)`
  cursor: pointer;
`;

function ResultTable(props) {
  const renderRows = (datas = []) => {
    return datas.map((data, index) => {
      return (
        <Row key={data.id}>
          <UserCard
            username={data.username}
            imageSize="32px"
            url={data.profile_image}
          />
        </Row>
      );
    });
  };

  return (
    <Table
      title={props.title}
      titleColor={props.titleColor}
      width="100%"
      rowNum={props.rowNum}
    >
      <SelectTable>{renderRows(props.datas)}</SelectTable>
    </Table>
  );
}

export default ResultTable;

ResultTable.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  rowNum: PropTypes.number,
  datas: PropTypes.array,
};

ResultTable.defaultProps = {
  title: "Table Title",
  titleColor: "MAIN_COLOR",
  rowNum: 3,
  datas: [ ... ],
};

```

```react
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
  backgroundColor: ST_YELLOW_LIGHT,
  backgroundSize: "14px",
  backgroundRepeat: "no-repeat",
  backgroundImage:
    "url(https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/check.png)",
  backgroundPosition: "92% center",
};

function SelectTable(props) {
  const [selectedOption, setSelectedOption] = useState(props.defaultOption);

  const handleClick = (id, e) => {
    e.preventDefault();
    setSelectedOption(id);
    console.log(id, selectedOption);
  };

  let fn = useCallback((child) => {
    console.log(child);
    var style = { ...child.props.style, ...selectedStyle };

    return React.cloneElement(child, {
      style,
      onClick: (e) => handleClick(child.key, e),
    });
  }, []);

  return <Fragment>{React.Children.map(props.children, fn)}</Fragment>;
}

export default SelectTable;

SelectTable.propTypes = {
  defaultOption: PropTypes.string,
  datas: PropTypes.array,
};

SelectTable.defaultProps = {
  defaultOption: "0",
  datas: [...]
  ],
};


```

첫 render시

![S1-1](https://github.com/arara90/images/blob/master/Simtime/simtime_035.png?raw=true)

클릭시

![S1-2](https://github.com/arara90/images/blob/master/Simtime/simtime_036.png?raw=true)

- cloneElement 사용시 map을 사용하게되고, 클릭할때마다 모든 데이터에 상응하는 요소들이 re-render된다. 좋은 생각이 아닌 듯. 다시 돌리자..ㅠ.ㅠ..

---

[최종]

```
import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TableRow from "../../../A-Atomics/Table/TableRow";
import Table from "../../../B-Molecules/Table/Table";
import SelectTable from "../../../B-Molecules/Table/SelectTable";
import UserCardForList from "../../../B-Molecules/User/UserCardForList";

const Row = styled(TableRow)`
  cursor: pointer;
`;
const UserCard = styled(UserCardForList)`
  cursor: pointer;
`;

function ResultTable(props) {
  const renderRows = (datas = []) => {
    return datas.map((data, index) => {
      return (
        <Row key={data.id}>
          <UserCard
            username={data.username}
            imageSize="32px"
            url={data.profile_image}
          />
        </Row>
      );
    });
  };

  return (
    <Table
      title={props.title}
      titleColor={props.titleColor}
      width="100%"
      rowNum={props.rowNum}
    >
      <SelectTable>{renderRows(props.datas)}</SelectTable>
    </Table>
  );

}

export default ResultTable;

ResultTable.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  rowNum: PropTypes.number,
  datas: PropTypes.array,
};

ResultTable.defaultProps = {
  title: "Table Title",
  titleColor: "MAIN_COLOR",
  rowNum: 3,
  // datas: null,
  datas: [
    {
      id: 0,
      profile_image:
        "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/user-basic.png",
      username: "arara",
    },
    {
      id: 1,
      profile_image:
        "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",
      username: "hello",
    },
    {
      id: 2,
      profile_image:
        "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/arrow-down.png",
      username: "hey",
    },
    {
      id: 3,
      profile_image:
        "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/user-basic.png",
      username: "parkh",
    },
    {
      id: 4,
      profile_image:
        "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/check-valid.png",
      username: "admin",
    },
  ],
};

```

```
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
  backgroundColor: ST_YELLOW_LIGHT,
  backgroundSize: "14px",
  backgroundRepeat: "no-repeat",
  backgroundImage:
    "url(https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/check.png)",
  backgroundPosition: "92% center",
};

function SelectTable(props) {
  const [selectedOption, setSelectedOption] = useState(props.defaultOption);

  const handleClick = (d) => {
    console.log(d);
  };

  let fn = (child) => {
    console.log(child.key, selectedOption);
    var style =
      child.key == selectedOption
        ? { ...child.props.style, ...selectedStyle }
        : null;

    return React.cloneElement(child, {
      style,
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


```

![S1-3](https://github.com/arara90/images/blob/master/Simtime/simtime_037.png?raw=true)
