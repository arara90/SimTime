import React, {useState, useCallback} from 'react'
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
`

const MyInputProfile = styled.input`
  position: absolute;
  top:0;
  width:0px;
 
`


const Preview = styled.div`
    margin: auto;
    position: absolute;
    top:0;
    // left: 50%;
    // transform: translate(-50%, 0);
    width:80px; 
    height:80px;
    background-image: url('${({src})=>src}');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    // border-radius: 50% 50%;
    background-color: white;


`

function InputProfile(props) {
  const {handleImageFile, src} = props;
  const [imgRatio, setImgRatio] = useState('profile');
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64

  const uploadImage = useCallback((e)=>{
    document.getElementById('imgFileUploader').click()
  },[])

  React.useEffect(()=>{
   if(src) setImgBase64(src)
   const pp = document.getElementById('profile_preview')
   pp.addEventListener('click', uploadImage);
   return () => pp.removeEventListener("click", uploadImage);
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
          if(preview.width>preview.height) setImgRatio('landscape')
          else if(preview.width==preview.height) setImgRatio('profile')
          else setImgRatio( 'portrait')
        }
      }
    };
  };

  return (
    <Wrap {...props}> 
      <MyInputProfile id="imgFileUploader"  type="file" accept="img/*"  multiple name="imgFile" onChange={readImageFile} /> 
        <Preview id="profile_preview" className="profile_preview" src={imgBase64?imgBase64.toString():"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/media/user-basic.png"} className={imgRatio}  />
    </Wrap>
  )
}

export default InputProfile

// export default React.forwardRef((props, ref) => (
//   <InputProfile {...props} InnerRef={ref} />
// )); 