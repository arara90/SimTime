# [js, Django] 

### javascript와 Django 서버에 적절한 DateTime사용하기.

https://8percent.github.io/2017-05-31/django-timezone-problem/ 

https://www.popit.kr/rest-api-%EB%82%A0%EC%A7%9C%EC%8B%9C%EA%B0%84-%ED%91%9C%ED%98%84-%EC%A0%95%ED%95%98%EA%B8%B0/ -REST API 날짜/시간 표현 정하기

https://docs.djangoproject.com/en/3.1/topics/i18n/timezones/





### Unix Time

- 1970-01-01 UTC 에서의 경과시간을 초(or 밀리초[1])로 환산해서 숫자.

  - 즉, 타임존과 상관없이 일정한 값

- 한번에 인지하기 어렵지만, 다양한 언어와 환경에서 Date처리 시 즉시 변환 가능 

- 시간대가 다른 서비스 사용하는 경우 혹은 서비스 확장 시 용이.

  

- 제한된 정보 표현이 불편 - 시간 정보 없이 날짜만 사용하는 경우 표현이 애매하다

```
{
  "unix_time_date":1521763200000,
  "iso_8601_date":"2018-03-23",
  "iso_8601_month":"2018-03",
  "iso_8601_year":"2018"
}
```

### ISO-8601

* 사람이 인식할 수 있는 문자
* 언어와 버전에 따라 미지원되는 경우 존재
  * JavaScript의 경우 Date에서 RFC2822 또는 ISO 8601를 지원하는데 IE9 미만에서는 ECMAScript 5를 하지 못하기 때문에 바벨과 같은 트랜스파일러를 사용하는 것과 같은 주의가 필요하다.
* 시간대가 다른 서비스 사용하는 경우(서머타임?) 혹은 서비스 확장, 환경 변화 시 번거로운 일이 발생할 수 있다.



* 제한된 정보 표현이 편리 

```
  "unix_time":1521739975,
  "unix_time_milisecond":1521739975123,
  "iso-8601":"2018-03-22T17:32:55+09:00",
  "iso-8601_timestamp":"2018-03-22T17:32:55.123+09:00"
```





하지만, 결론은 본인이 사용하는 FrameWork가 지향하는 방식을 사용하자.



## Django?

settings.py

```python
USE_TZ = True
TIME_ZONE = 'Asia/Seoul'
```





### naive datetime 객체 해석[¶](https://docs.djangoproject.com/en/3.1/topics/i18n/timezones/#interpretation-of-naive-datetime-objects)

When [`USE_TZ`](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-USE_TZ) is `True`, Django still accepts naive datetime objects, in order to preserve backwards-compatibility. When the database layer receives one, it attempts to make it aware by interpreting it in the [default time zone](https://docs.djangoproject.com/en/3.1/topics/i18n/timezones/#default-current-time-zone) and raises a warning.

Unfortunately, during DST transitions, some datetimes don’t exist or are ambiguous. In such situations, [pytz](http://pytz.sourceforge.net/) raises an exception. That’s why you should always create aware datetime objects when time zone support is enabled.

In practice, this is rarely an issue. Django gives you aware datetime objects in the models and forms, and most often, new datetime objects are created from existing ones through [`timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta) arithmetic. The only datetime that’s often created in application code is the current time, and [`timezone.now()`](https://docs.djangoproject.com/en/3.1/ref/utils/#django.utils.timezone.now) automatically does the right thing.





unixtimestamp 추천

https://stackoverflow.com/questions/42067066/convert-javascript-date-to-python-django-models-datetimefield

ㅇ





unixtimestamp 사용법

https://stackoverflow.com/questions/12589764/unix-timestamp-to-datetime-in-django-with-timezone 





## JavsScript?

유닉스 타임스탬프를 사용한다.

https://medium.com/@pks2974/javascript-%EC%99%80-date-%EB%82%A0%EC%A7%9C-cf638c05f8f3

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString



> ### Date format and time zone conversions
>
> There are several methods available to obtain a date in various formats, as well as to perform time zone conversions. Particularly useful are the functions that output the date and time in Coordinated Universal Time (UTC), the global standard time defined by the World Time Standard. (This time is historically known as *Greenwich Mean Time*, as UTC lies along the meridian that includes London—and nearby Greenwich—in the United Kingdom.) The user's device provides the local time.
>
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date



python으로 부터 날아온  ISO 8601 형식의 문자열을 js의 unix timestamp로 변환해준닷 



### ISO -> unix (from python to js)

**Date.parse()** 

 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/parse



### UNIX -> ISO (from js to python)

**Date.toISOString()**

 시간대는 언제나 UTC이다.

```
const today = new Date('05 October 2011 14:48 UTC');
console.log(today.toISOString()); // Returns 2011-10-05T14:48:00.000Z
```



`toISOString`은 ECMA-262 제5판에 표준으로 자리잡았습니다. 아직 지원하지 않는 환경에서는 다음 코드를 추가해 대체할 수 있습니다.

```js
if (!Date.prototype.toISOString) {
  (function() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toISOString = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };

  }());
}
```





### DB에 데이터 저장 후(post), serializer에서 response 수정하여 보내기.

to_presentation 

https://stackoverflow.com/questions/53863802/how-to-serialize-a-api-response-in-json-and-modify-and-add-fields-to-it-in-dja

https://medium.com/better-programming/how-to-use-drf-serializers-effectively-dc58edc73998