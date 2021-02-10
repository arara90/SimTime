# Errors

## 1. Uncaught TypeError: Cannot set property 'myRef' of undefined

![ref](https://github.com/arara90/images/blob/master/Simtime/simtime_029.png?raw=true)

```react
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Paragraph from "../Font/Paragraph";
import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_SEMI_YELLOW,
  ST_SEMI_GRAY,
} from "../../Colors";

const Wrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
`;

const MySelect = styled.div`
  padding-left: 4px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  line-height: ${(props) => props.height};
  border-width: 0px;

  font-size: 15px;
  font-weight: 400;

  cursor: ${(props) => props.cursor};

  ${(props) =>
    props.arrow
      ? `
  background-size: 15px;
  background-repeat: no-repeat;
  background-image: url("https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/arrow-down2.png");
  background-position: 88% center;`
      : null};
`;

const OptionWrap = styled.div`
  // border: solid 1px ${ST_SEMI_YELLOW};
  padding: 1px 1px 1px 1px;

  background-color: white;
  ${(props) => (props.showOptions ? null : "display: none")};
  width: ${(props) => props.width};
  height: ${(props) => props.contentHeight};

  position: absolute;
  top: ${(props) => props.top};
  left: 0px;

  font-size: 15px;
  font-weight: 400;
  z-index: 9999;
`;

const Option = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  line-height: ${(props) => props.height};
  font-size: 15px;
  font-weight: 400;

  padding-left: 4px;
  padding-right: 4px;

  &:hover {
    background-color: ${ST_YELLOW_LIGHT};
  }
`;

export class SelectBoxRef extends Component {
  constructor(props) {
    console.log("props");
    this.myRef = React.createRef();
  }

  renderOptions = (options) => {
    return (
      <OptionWrap
        width={width}
        top={height}
        contentHeight={
          parseInt(height.replace(/[^0-9]/g, "")).toFixed(0) * options.length +
          2 +
          "px"
        }
        showOptions={showOptions}
        onBlur={changeShowOptions}
      >
        {options.map((option) => {
          return (
            <Option
              key={option}
              isSelected={option === selectedOption}
              onClick={() => changeSelectedOptions(option)}
            >
              {option}
            </Option>
          );
        })}
      </OptionWrap>
    );
  };

  render() {
    return (
      <Wrap {...props}>
        <MySelect ref={this.myRef}>
          <Paragraph fontSize="15px">{selectedOption}</Paragraph>
          {renderOptions(options)}
        </MySelect>
      </Wrap>
    );
  }
}

export default SelectBoxRef;

SelectBoxRef.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.array,
  defaultOption: PropTypes.string,
  arrow: PropTypes.bool,
  cursor: PropTypes.string,
};

SelectBoxRef.defaultProps = {
  width: "80px",
  height: "30px",
  options: ["AM", "PM"],
  defaultOption: "PM",
  arrow: true,
  cursor: "pointer",
};

```

예상?

​

## 2. image Upload

action 까지 File전달 후, EventAPI에서 File이 빈값임.

```python

class EventAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    print("hello", permission_classes)

    def get(self, request):
        events = self.request.user.events.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
        # return self.request.user.events.all()  # related_name으로 invitations지정

    def post(self, request):
        # Event API로 오는길에 photo를 잃어버린다?
        serializer = EventSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(host=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


########################################################################
#    gre {'host': 5, 'event_name': 'ddd', 'event_at': '2020-06-17T19:00:00.000Z','status': 'CLOSED', 'location': {'lat': 37.5510826987805, 'lng': 126.923721083602, #'name': 'D'}, 'message': 'dfa', 'photo': {}}
#Bad Request: /api/events/create
#[16/Jun/2020 16:12:55] "POST /api/events/create HTTP/1.1" 400 117

```

https://stackoverflow.com/questions/56656080/react-axios-is-sending-file-data-as-undefined-to-a-node-server

action axios에서 변경

```js
'content-type': 'multipart/form-data'
```

FormData() 사용

## python manage.py collectstatic 시 Error

```
Traceback (most recent call last):
  File "manage.py", line 21, in <module>
    main()
  File "manage.py", line 17, in main
    execute_from_command_line(sys.argv)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\core\management\__init__.py", line 401, in execute_from_command_line
    utility.execute()
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\core\management\__init__.py", line 395, in execute
    self.fetch_command(subcommand).run_from_argv(self.argv)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\core\management\base.py", line 328, in run_from_argv
    self.execute(*args, **cmd_options)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\core\management\base.py", line 369, in execute
    output = self.handle(*args, **options)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\contrib\staticfiles\management\commands\collectstatic.py", line 187, in handle
    collected = self.collect()
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\contrib\staticfiles\management\commands\collectstatic.py", line 113, in collect
    handler(path, prefixed_path, storage)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\contrib\staticfiles\management\commands\collectstatic.py", line 338, in copy_file
    if not self.delete_file(path, prefixed_path, source_storage):
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\django\contrib\staticfiles\management\commands\collectstatic.py", line 248, in delete_file
    if self.storage.exists(prefixed_path):
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\storages\backends\s3boto3.py", line 562, in exists
    self.connection.meta.client.head_object(Bucket=self.bucket_name, Key=name)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\client.py", line 316, in _api_call
    return self._make_api_call(operation_name, kwargs)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\client.py", line 608, in _make_api_call
    api_params, operation_model, context=request_context)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\client.py", line 654, in _convert_to_request_dict
    api_params, operation_model, context)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\client.py", line 686, in _emit_api_params
    params=api_params, model=operation_model, context=context)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\hooks.py", line 356, in emit
    return self._emitter.emit(aliased_event_name, **kwargs)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\hooks.py", line 228, in emit
    return self._emit(event_name, kwargs)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\hooks.py", line 211, in _emit
    response = handler(**kwargs)
  File "C:\Users\arara\.virtualenvs\Simtime-A1kdj5wl\lib\site-packages\botocore\handlers.py", line 231, in validate_bucket_name
    if not VALID_BUCKET.search(bucket) and not VALID_S3_ARN.search(bucket):
TypeError: expected string or bytes-like object
```

https://github.com/boto/boto3/issues/1129

- if not VALID_BUCKET.search(bucket) and not VALID_S3_ARN.search(bucket)

![invalidbucket](https://github.com/arara90/images/blob/master/Simtime/simtime_030.png?raw=true)

param을 출력해본 결과 Bucket이 none이었다.

> {'Bucket': None, 'Key': 'img/icons/arrow-down.png'}

https://github.com/boto/boto3/issues/1129

https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html

를 통해 django-storages를 사용할 때, settings에 지정된 변수명이 있다는 것을 발견!

문서에 지정된 변수명으로 수정하니 해결되었다.

수정이후 출력

> ...
>
> {'Bucket': 'bucket-simtime', 'Key': 'img/icons/search.png'}
> {'Bucket': 'bucket-simtime', 'Key': 'img/icons/search.png', 'Body': <s3transfer.utils.ReadFileChunk object at 0x0000017054DAD788>, 'ACL': 'public-read', 'ContentType': 'image/png'}
>
> ...

경로에 /static/ 이 들어가는 모든 파일들이 모아졌다.

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [
  os.path.join(BASE_DIR, 'Simtime', 'assets')
  ]
```

다시 한 번 변수별로 담당하는 역할을 자세히 살펴보면,

https://blog.hannal.com/2015/04/start_with_django_webframework_06/

`STATICFILES_DIRS`은 개발 단계에서 사용하는 정적 파일이 위치한 경로들을 지정하는 설정 항목입니다. 특정 Django App[2](https://blog.hannal.com/2015/04/start_with_django_webframework_06/#fn:2)에만 사용하는 정적 파일이 있거나 혹은 정적 파일을 관리하기 용이하게 하기 위해 여러 경로(path)에 정적 파일을 배치하였다면, 이 경로들을 Python의 `list`나 `tuple`로 담으면 됩니다.

`STATIC_URL`은 웹 페이지에서 사용할 정적 파일의 최상위 URL 경로입니다. 이 최상위 경로 자체는 실제 파일이나 디렉터리가 아니며, **URL로만 존재하는 단위**입니다. 그래서 이용자 마음대로 정해도 무방하며, 저는 `assets`라는 URL 경로를 쓰겠습니다.

```
STATIC_URL = '/assets/'
```

문자열은 반드시 `/`로 끝나야 합니다. `findstatic` 명령어로 탐색되는 정적 파일 경로에 `STATIC_URL` 경로를 합치면 실제 웹에서 접근 가능한 URL이 됩니다.

- `findstatic js/jquery-2.1.3.min.js` : http://pystagram.com**/assets/js/jquery-2.1.3.min.js**

#### `STATIC_ROOT`

`STATIC_ROOT`는 Django 프로젝트에서 사용하는 모든 정적 파일을 한 곳에 모아넣는 경로입니다. 한 곳에 모으는 기능은 `manage.py` 파일의 `collectstatic` 명령어로 수행합니다. Django가 모든 파일을 검사하여 정적 파일로 사용하는지 여부를 확인한 뒤 모으는 건 아니고, 각 Django 앱 디렉터리에 있는 `static` 디렉터리와 `STATICFILES_DIRS`에 지정된 경로에 있는 모든 파일을 모읍니다.

개발 과정에선, 정확히는 `settings.py`의 `DEBUG`가 `True`로 설정되어 있으면 `STATIC_ROOT` 설정은 작용하지 않으며, `STATIC_ROOT`는 실 서비스 환경을 위한 설정 항목입니다. 그래서 개발 과정에선 `STATIC_ROOT`에 지정한 경로가 실제로 존재하지 않거나 아예 `STATIC_ROOT` 설정 항목 자체가 없어도 문제없이 동작합니다.

그렇다면 실 서비스 환경에서 `STATIC_ROOT`는 왜 필요할까요? 이 경로에 있는 모든 파일을 웹 서버가 직접 제공(serving)하기 위함입니다. 실제 실습하며 확인해 보겠습니다.

+) 원하는 폴더로 묶기

https://docs.djangoproject.com/en/3.0/howto/static-files/deployment/ 참고

settings.py

```python
DEFAULT_FILE_STORAGE = 'Simtime.storages.MediaStorage'   #파일위치
STATICFILES_STORAGE = 'Simtime.storages.StaticStorage'

MEDIAFILES_LOCATION = 'media'
STATICFILES_LOCATION = 'static'
```

storages.py

```python
from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    location = settings.MEDIAFILES_LOCATION


class StaticStorage(S3Boto3Storage):
    location = settings.STATICFILES_LOCATION
```
