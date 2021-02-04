// 요청을 위한 액션 타입을 payload로 설정합니다

const START_LOADING = 'loading/START_LOADING'
const FINISH_LOADING = 'loading/FINISH_LOADING'

export const startLoading = (type)=>{
  return { type: START_LOADING, payload: type }
}

export const finishLoading = (type) => {
  return { type: FINISH_LOADING, payload: type } 
}
