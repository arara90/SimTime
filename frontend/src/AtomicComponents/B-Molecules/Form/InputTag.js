import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import SelectedItem from "../../A-Atomics/Filter/SelectedItem";
import Input from "../../A-Atomics/Form/Input";
import InputWrap from "../../A-Atomics/Form/InputWrap";

import {
  ST_GRAY,
  ST_SEMI_GRAY,
  ST_SEMI_YELLOW,
  MAIN_COLOR,
} from "../../Colors";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
`;

const MyTagsWrap = styled.div`

  display: block;

  height: auto;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;

  // display: flex;
  // flex-direction: row;
  // justify-content: flex-start;

  // overflow-x: auto;
  // overflow-y: hidden;
  // &::-webkit-scrollbar {
  //   height: 5px;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: ${ST_SEMI_YELLOW};
  //   border-radius: 5px;

  //   &:hover {
  //     background-color: ${ST_GRAY};
  //   }
  // }

  // &::-webkit-scrollbar-track {
  //   background-color: ${ST_SEMI_GRAY};
  //   border-radius: 5px;
  //   box-shadow: inset 0px 0px 3x white;
  // }
`;

const MyInput = styled(Input)`
`

// ::-webkit-scrollbar { width: 5.2px; } /* 스크롤 바 */
// ::-webkit-scrollbar-track { background-color:#5D5D5D; } /* 스크롤 바 밑의 배경 */
// ::-webkit-scrollbar-thumb { background: #303030; } /* 실질적 스크롤 바 */
// ::-webkit-scrollbar-thumb:hover { background: #404040; } /* 실질적 스크롤 바 위에 마우스를 올려다 둘 때 */
// ::-webkit-scrollbar-thumb:active { background: #808080; } /* 실질적 스크롤 바를 클릭할 때 */
// ::-webkit-scrollbar-button { display: none; } /* 스크롤 바 상 하단 버튼 */

const MyItem = styled(SelectedItem)`
  height: 20px;
  white-space: nowrap;

`;

function InputTag(props) {
  const { name, label, desc, tags, width, height, items, changeTags } = props;
  const [myTags, setMyTags] = useState(items);
  // const inputRef = useRef();

  const deleteItem = (value) =>{
    let newItems = myTags.filter(tag => tag != value);
    setMyTags(newItems);

  } 
  const renderItems = () => {
    return myTags.map((tag, index) => {
      return <MyItem key={tag} deleteItem={()=>deleteItem(tag)}>#{tag}</MyItem>;
    });
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      if( myTags.indexOf( e.target.value) == -1 ){
        let newItems = [...myTags, e.target.value];
        changeTags(newItems)
        setMyTags(newItems);
        e.target.value=""
      }else{
        alert("중복된 값 입니다.")
        e.target.value=""
      }

    }
  };

  // useEffect(() => {
  //   console.log(inputRef.current);
  // }, [inputRef]);

  // const MyInput = React.forwardRef((props, inputRef) => (
  //   <Input ref={inputRef} onKeyPress={handleKeyPress} {...props} />
  // ));

  return (
    <Wrap {...props}>
      <InputWrap
      onKeyPress={handleKeyPress} 
        name={name}
        label={label}
        children={
          <MyInput {...props}/>
        }></InputWrap>
      <MyTagsWrap>{renderItems()}</MyTagsWrap>
    </Wrap>
  );
}


export default InputTag;

InputTag.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  items: PropTypes.array,
};

InputTag.defaultProps = {
  items: [],
  desc:"Tag",
};

