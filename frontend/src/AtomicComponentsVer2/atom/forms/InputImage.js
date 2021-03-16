import React, {Fragment, useState} from 'react'
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
`

const MyInputImage = styled.input`
  width: 100%;
`

const PreviewWrap = styled.div`
  width: 100%;
  height: 95%;
  max-height : 260px;
  margin-top: 10px;
`

const Preview = styled.img`
  display: block;
  &.landscape{
    width:100%; 
    height:auto;
    margin: auto 0;
  }
  &.portrait{
    width:auto; 
    height:100%;
    margin: 0 auto;
  }
`

function InputImage(props) {
  const {handleImageFile, src} = props;
  const [imgRatio, setImgRatio] = useState('landscape');
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64

  React.useEffect(()=>{
   if(src) setImgBase64(src)
  
  },[])

  const readImageFile = (e) => {
    var reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      handleImageFile(e.target.files[0]); //
    }

    reader.onload = () => {
      var preview = new Image();      
      var base64 = reader.result;

      if (base64) {
        setImgBase64(base64); //getImgBase64
        preview.src = base64;
        preview.onload = () => {
          setImgRatio(preview.width>preview.height ? 'landscape' : 'portrait')
        }
      }
    };
  };

  return (
    <Wrap {...props}> 
      <MyInputImage type="file" accept="img/*" required multiple name="imgFile" id="imgFile" onChange={readImageFile} /> 
      <PreviewWrap>
        <Preview className="profile_preview" src={imgBase64.toString()} className={imgRatio}  />
      </PreviewWrap>
    </Wrap>
  )
}

export default InputImage

// export default React.forwardRef((props, ref) => (
//   <InputImage {...props} InnerRef={ref} />
// )); 