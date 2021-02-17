import axios from "axios";

const KAKAO_API_KEY = "7c0d69b3d8e1ef9e62317d9ce2cf7c28";
const URL = "https://dapi.kakao.com/v2/local/search/keyword.json"; //"https://dapi.kakao.com/v2/local/search/keyword.json?query=송내 투썸&sort=accuracy"

const client = axios.create({
  baseURL: `${URL}`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
  timeout: 10000, // 타임아웃 10초
});

export const searchPlaces = (
  query = "투썸",
  //   category_group_code = null,
  //   x = "",
  //   y = "",
  //   radius = "",
  //   rect = "",
  page = 1,
  size = 10,
  sort = "accuracy"
) => {
  const params = {
    query, //검색을 원하는 질의어
    // category_group_code, // MT1, CS2, PS3, SC4, AC5, PK6, OL7, SW8, BK9, CT1, AG2, PO3, AT4, AD5, FD6, CE7, HP8, PM9
    // x, //중심 좌표의 X값 혹은 longitude, 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능
    // y, //중심 좌표의 Y값 혹은 latitude, 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능
    // radius, //중심 좌표부터의 반경거리. 특정 지역을 중심으로 검색하려고 할 경우 중심좌표로 쓰일 x,y와 함께 사용. 단위 meter. 0~20000 사이의 값
    // rect, //사각형 범위내에서 제한 검색을 위한 좌표. 지도 화면 내 검색시 등 제한 검색에서 사용 가능. 좌측 X 좌표, 좌측 Y 좌표, 우측 X 좌표, 우측 Y 좌표 형식.
    page, //결과 페이지 번호, 1-45 사이, 기본 값 1
    size, //한 페이지에 보여질 문서의 개수, 1~15 사이, 기본 값 15
    sort, //accuracy, recency
  };
  return client
    .get("", {
      params,
    })
    .then(({ status, statusText, data }) => {
      if (status === 200) {
        const {
          meta: {
            is_end, // 현재 페이지가 마지막 페이지인지 여부(false이면 다음 페이지를 요청할 수 있음)
            pageable_count, // 검색 결과로 제공 가능한 문서수
            total_count, // 전체 검색된 문서수
          },
          documents,
        } = data;

        const result = {
          isEnd: is_end,
          pageableCount: pageable_count,
          totalCount: total_count,
          items:
            documents && documents.length
              ? documents.map(
                  (
                    {
                      address_name,
                      category_group_code,
                      category_group_name,
                      category_name,
                      distance,
                      id,
                      phone,
                      place_name,
                      place_url,
                      road_address_name,
                      x,
                      y,
                    },
                    index
                  ) => {
                    return {
                      id: id,
                      name: place_name,
                      desc: road_address_name,
                      place_id: id,
                      place_url,
                      lan: x,
                      lat: y,
                      address: road_address_name,
                    };
                  }
                )
              : [],
        };
        return result;
      } else {
        throw new Error(`${status}:${statusText}`);
      }
    });
};
