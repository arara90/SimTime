import { func } from "prop-types";

export function getStringDate(date, type='month'){
  const now = new Date(date)
  var year = now.getFullYear().toString();
  var month = (now.getMonth() + 1).toString();
  var date = now.getDate().toString();
  var day = now.getDay().toString().substr(0,3);

  var koWeek = ['일', '월', '화', '수', '목', '금', '토'];
  var engWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if(type=='year'){
      return year
  } else if(type=='month'){
      return [year, month].join('.')
  } else if(type=='date') {
      return [year, month, date].join('.')
  } else if(type=='day') {
      return [year, month, date].join('.') + ` (${koWeek[day]})`
  } 
}

export function getStrYear(date) {
  return date.getFullYear().toString();
}

export function getStrMonth(date, type = "mm") {
  type.toLowerCase();
  if (type == "mm") {
    return ("0" + (date.getMonth() + 1).toString()).substr(-2);
  } else {
    return (date.getMonth() + 1).toString();
  }
}

export function getStrDate(date, type = "dd") {
  type.toLowerCase();
  if (type == "dd") {
    return ("0" + date.getDate().toString()).substr(-2);
  } else {
    return date.getDate().toString();
  }
}

export function getFullTime(date){
  return ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2)
}

export function getStrFullDate(date, type = "yyyymmdd") {
  type.toLowerCase();

  if (type == "yyyymmdd") {
    return getStrYear(date) + getStrMonth(date) + getStrDate(date);
  } else if (type == "yyyy-mm-dd") {
    return `${getStrYear(date)}-${getStrMonth(date)}-${getStrDate(date)}`;
  } else if (type == "yyyy-m-d") {
    return `${getStrYear(date)}-${getStrMonth(date, "m")}-${getStrDate(
      date,
      "d"
    )}`;
  } else if (type == "yyyy/mm/dd") {
    return `${getStrYear(date)}/${getStrMonth(date)}/${getStrDate(date)}`;
  } else if (type == "yyyy/m/d") {
    return `${getStrYear(date)}/${getStrMonth(date, "m")}/${getStrDate(date,"d")}`;
  } else if (type == "yyyy.m.d") {
    return `${getStrYear(date)}.${getStrMonth(date, "m")}.${getStrDate(date,"d")}`;
  } else if (type == "yyyy.mm.dd") {
    return `${getStrYear(date)}.${getStrMonth(date)}.${getStrDate(date)}`;
  } else {
    return `${getStrYear(date)}-${getStrMonth(date)}-${getStrDate(date)}`;
  }
}

export function getStrFullMonth(date, type = "yyyymm") {
  type.toLowerCase();

  if (type == "yyyymm") {
    return getStrYear(date) + getStrMonth(date);
  } else if (type == "yyyy-mm") {
    return `${getStrYear(date)}-${getStrMonth(date)}`;
  } else if (type == "yyyy-m") {
    return `${getStrYear(date)}-${getStrMonth(date, "m")}`;
  } else if (type == "yyyy/mm") {
    return `${getStrYear(date)}/${getStrMonth(date)}`;
  } else if (type == "yyyy/m") {
    return `${getStrYear(date)}/${getStrMonth(date, "m")}`;
  } else if (type == "yyyy.m") {
    return `${getStrYear(date)}.${getStrMonth(date, "m")}`;
  } else if (type == "yyyy.mm") {
    return `${getStrYear(date)}.${getStrMonth(date)}`;
  } else {
    return `${getStrYear(date)}-${getStrMonth(date)}`;
  }
}

export function addDate(date, num) {
  var res = new Date(getStrFullDate(date, "yyyy-m-d"))
  res.setDate(res.getDate() + num);
  return  res
}

export function subDate(date1, date2) {
  return Math.floor(
    (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function subWeek(date1, date2) {
  return Math.floor(subDate(date1, date2) / 7);
}

//달력 일자 생성
export function generate(currDate, num=0) {
  // type: n -- 특점 시점으로부터 n주씩,
  // type: 0 -- monthly 달력
  //00시로 맞추기위해 따로 new Date()를 "yyyy-m-d"형태로 변환해줌. 안해주면 간헐적으로 today의 id가 -1, 0 으로 간헐적으로 왔다갔다함.
  const today = new Date(getStrFullDate(new Date(), "yyyy-m-d"));
  const firstDay = new Date(currDate.getFullYear(), currDate.getMonth(), 1); // 넘겨받은 달의 1일
  const lastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0); // 넘겨받은 달의 말일
  
  var weekDay = 0;
  var offset = 0;
  var startDate = new Date();
  var endDate = new Date();


  if(num==0){
    weekDay = firstDay.getDay();
    offset = 7 - parseInt((lastDay.getDate() + weekDay) % 7);
    startDate = addDate(firstDay, weekDay * -1);
    endDate = addDate(lastDay, offset < 7 ? offset : 0);


  }else {
    weekDay = currDate.getDay();
    offset = ( (7 *( num -1 ))  + 6 - weekDay); // num weeks
    startDate = addDate(currDate, weekDay * -1);
    endDate = addDate(currDate, offset); 
  }

  var curr = new Date(startDate);

  //한 주차씩 담기용
  var weekDates_orgin = [];
  var weekDates = [];

  //최종 배열
  var dates_origin = [];
  var dates = [];

  while (curr <= endDate) {
    //week별 저장
    weekDates_orgin.push({ id: `${subDate(today, curr)}D`, day: curr });
    weekDates.push({
      id: `${subDate(today, curr)}D`,
      strDate: getStrFullDate(curr, "yyyy-mm-dd"), //"2020-04-15"
      year: curr.getUTCFullYear(),
      month: curr.getMonth() + 1,
      day: curr.getDay(), // 0~6
      isActive: getStrFullDate(curr) >= getStrFullDate(today),
      isActiveMonth:
        getStrFullDate(curr).substr(0, 6) ==
        getStrFullDate(currDate).substr(0, 6),
      date: curr.getDate().toString(), // "15"
    });

    //다음날 저장
    curr.setDate(curr.getDate() + 1);

    if (curr.getDay() == 0) {
      dates_origin.push({
        id: `${subWeek(today, curr)}W`,
        weekDates: weekDates_orgin,
      });

      dates.push({ id: `${subWeek(today, curr)}W`, weekDates: weekDates });
      weekDates_orgin = [];
      weekDates = [];
    }
  }

  return { start:startDate, end:endDate , weeks:dates};
}
