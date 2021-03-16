export function getStringDate(date, type='month'){
  const now = new Date(date)
  var year = now.getFullYear().toString();
  var month = ('0'.concat(now.getMonth() + 1).toString()).slice(-2);
  var date = now.getDate().toString();
  var day = now.getDay().toString().substr(0,3);

  var koMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  var engMonth = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var engMonthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
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
  var now = new Date(date);
  return now.getFullYear().toString();
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
  console.log(date,type )

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
  var res = new Date(getStrFullDate(date, "yyyy-mm-dd"))
  res.setDate(res.getDate() + num);
  return  res
}

export function subDate(date1, date2) {
  var a = new Date(date1)
  var b = new Date(date2)
  return Math.floor(
    (a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24) + 1
  );
}

export function subWeek(date1, date2) {
  return Math.floor(subDate(date1, date2) / 7);
}

//달력 일자 생성
export function generate(currDate, num=0) {
  // type: n -- 특점 시점으로부터 n주씩,
  // type: 0 -- monthly 달력
  const today = new Date(getStrFullDate(new Date(), "yyyy-mm-dd"));
  const firstDay = new Date(currDate.getFullYear(), currDate.getMonth(), 1); // 넘겨받은 달의 1일
  const lastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0); // 넘겨받은 달의 말일
  
  var weekDay = 0;
  var offset = 0;
  var startDate = new Date();
  var endDate = new Date();


  if(num==0){//monthly
    weekDay = firstDay.getDay();
    offset = 7 - parseInt((lastDay.getDate() + weekDay) % 7);
    startDate = addDate(firstDay, weekDay * -1);
    endDate = addDate(lastDay, offset < 7 ? offset : 0);
  }else {
    weekDay = currDate.getDay();

    if(num>0){
      offset = ( (7 *( num -1 ))  + 6 - weekDay); // num weeks
      startDate = addDate(currDate, weekDay * -1);
      endDate = addDate(currDate, offset); 
    }else{
      offset = ( (7 *( num -1 ))  + 7 - weekDay); // num weeks
      endDate = addDate(currDate, weekDay * -1);
      startDate = addDate(currDate, offset);
      
      console.log('currDate, offset', currDate, offset, weekDay)
    }
  }

  var curr = new Date(startDate);

  // //한 주차씩 담기용
  // var weekDates_orgin = [];
  // var weekDates = [];

  // //최종 배열
  // var dates_origin = [];
  // var dates = [];

  // while (curr <= endDate) {
  //   //week별 저장
  //   weekDates_orgin.push({ id: `${subDate(today, curr)}D`, day: curr });
  //   weekDates.push({
  //      id: `${subDate(today, curr)}D`,
  //     strDate: getStrFullDate(curr, "yyyy-mm-dd"), //"2020-04-15"
  //     year: curr.getUTCFullYear(),
  //     month: curr.getMonth() + 1,
  //     day: curr.getDay(), // 0~6
  //     isActive: getStrFullDate(curr) >= getStrFullDate(today),
  //     isActiveMonth:
  //       getStrFullDate(curr).substr(0, 6) ==
  //       getStrFullDate(currDate).substr(0, 6),
  //     date: curr.getDate().toString(), // "15"
  //   });

  //   //다음날 저장
  //   curr.setDate(curr.getDate() + 1);

  //   if (curr.getDay() == 0) {
  //     dates_origin.push({
  //       id: `${subWeek(today, curr)}W`,
  //       weekDates: weekDates_orgin,
  //     });

  //     dates.push({ [weekDates[0].strDate]: weekDates });
  //     weekDates_orgin = [];
  //     weekDates = [];
  //   }
  // }
  
  //한 주차씩 담기용
  var weekDates_orgin = new Map();
  var weekDates =  []
  var data = {};

  //최종 배열
  var dates_origin =  new Map();
  var dates =  new Map();

  while (curr <= endDate) {
    //week별 저장
    data = {
      strDate: getStrFullDate(curr, "yyyy-mm-dd"), //"2020-04-15"
      year: curr.getUTCFullYear(),
      month: curr.getMonth() + 1,
      day: curr.getDay(), // 0~6
      isActive: getStrFullDate(curr) >= getStrFullDate(today),
      isActiveMonth:
        getStrFullDate(curr).substr(0, 6) ==
        getStrFullDate(currDate).substr(0, 6),
      date: curr.getDate().toString(), // "15"
    }

    weekDates_orgin.set(`${subDate(today, curr)}D`, curr); 
    // weekDates.set(`${subDate(today, curr)}D`, data);
    weekDates.push(data);

    //다음날 저장
    curr.setDate(curr.getDate() + 1);

    if (curr.getDay() == 0) {
      // dates_origin.set(`${subWeek(today, curr)}W`, weekDates_orgin);
      // dates.set(`${subWeek(today, curr)}W`, weekDates);
      dates_origin.set(`${subWeek(today, curr)}W`, weekDates_orgin);
      dates.set(weekDates[0].strDate, weekDates);
      weekDates_orgin = new Map();
      weekDates = [];
    }
  }
  // console.log('calendar', dates)
  return { start:startDate, end:endDate , weeks:dates};
}
