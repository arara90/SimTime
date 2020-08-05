# handleModal의 위치에 따른 props 전달

```react
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
//context
import { ModalContext } from "../../contexts/modalContext";
import ModalContextPortal, {
  ModalPortalBasic,
} from "../A-Atomics/Modal/ModalPortal";
//redux-actions
import { getMemebers, getGroups } from "../../actions/groups";
// import { getHosts } from "../../actions/invitations"
import TestModal from "./TestModal";

const Wrap = styled.div`
  overflow: hidden;
`;

const Bt = styled.button``;

const Content = React.memo((selectedGroup, relationships, closeModal) => {
  return (
    <TestModal
      selectedGroup={selectedGroup}
      relationships={relationships}
      onClose={closeModal}
    />
  );
});

function TestPage(props) {
  const { groups, relationships } = props;
  const { modal, setModal, closeModal, handleModal } = useContext(ModalContext);
  const ref = React.createRef();
  React.useEffect(() => {
    props.getGroups();
  }, []);

    
    //////////////////////// 1. return함수 밖에서 실행
  var getMem = async (selectedGroup) => {
    var res = await props.getMemebers(ref.current.value);
    // setModal(true);
    handleModal(
      <TestModal
        selectedGroup={groups.selectedGroup}
        relationships={props.relationships}
        onClose={closeModal}
      />
    );
  };

    
  /////////////////////////2. return 내의 자식
    <Wrap>
      <Bt onClick={() => getMem(groups.selectedGroup)}> click </Bt>
      <input ref={ref}></input>
      {modal && (
        <ModalPortalBasic
          className="dd"
          children={
            <TestModal
              selectedGroup={groups.selectedGroup}
              relationships={props.relationships}
              onClose={closeModal}
            />
          }
        />
      )}
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups,
  relationships: state.friends,
});

export default connect(mapStateToProps, { getMemebers, getGroups })(TestPage);

```



1번으로 작성했다가 props가 함께 업데이트 되지 않고, 함수를 부른 시점의 props를 가지고 있음.

  즉, 멤버를 호출하기 전의 props로 고정되어있음. 



따라서 2번처럼 ModalPortal을 직접 자식으로 넣어주니 props 업데이트가 잘 이루어짐.





### 원인 찾기

1. ModalPortal이 부모 컴포넌트의 자식이 아니기 때문일까 (react)

2. 함수 호출 시점.





=============================================================

![portal](https://github.com/arara90/images/blob/master/Simtime/simtime_044.png?raw=true)

```react

export const ModalContextPortal = (props) => {
  const el = document.getElementById("app-modal");
  let { modalContent, modal } = React.useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <Fragment>
        <MyModal className="modalcontextPotal">
          <ContentWrap>{modalContent}</ContentWrap>
        </MyModal>
      </Fragment>,
      el
    );
  } else return null;
};

export const ModalPortalBasic = (props) => {
  const el = document.getElementById("app-modal");
  return ReactDOM.createPortal(
    <Fragment>
      <MyModal className="modalcontextPotal">
        <ContentWrap>{props.children}</ContentWrap>
      </MyModal>
    </Fragment>,
    el
  );
};

```

- 두 컴포넌트의 차이는  컨텍스트의 modal을 portal component 내부에서 사용하느냐 외부에서 사용하느냐의 차이



일단 portal 자체는 어떤 방식으로 (자식, 또는 함수 호출) 만들어도  "app-modal"에 동일하게 생성됨.

(당연한 얘기) 즉, 렌더된 결과 상으로는  부모 컴포넌트와 관련이 없어보이지만 섭섭한 말씀.



https://ko.reactjs.org/docs/portals.html#event-bubbling-through-portals

```
Portal을 통한 이벤트 버블링 

portal이 DOM 트리의 어디에도 존재할 수 있다 하더라도 모든 다른 면에서 일반적인 React 자식처럼 동작합니다. context와 같은 기능은 자식이 portal이든지 아니든지 상관없이 정확하게 같게 동작합니다. 이는 DOM 트리에서의 위치에 상관없이 portal은 여전히 React 트리에 존재하기 때문입니다.
```

내부적으로는 portal을 생성하는 위치, 즉 부모가 누구냐에 따라 변경이 일어났을때 리렌더의 여부가 결정될 수 있는 엄연한 자식임.

  

-- --

 따라서 **Case2**의 경우 명확하게 자식으로서 부모와 연결성이 있다는 것을 직관적으로도 알 수 있음.  부모의 props나 state가 업데이트가 될 때마다 Modal의 상태도 함께 변함.  단지 z-index로 엄마 배 위에 있는 자식라고 쉽게 생각하면 됨. (건방진 자식).



즉, **부모의 props나 state와 밀접하게 연관된 경우** 이러한 방식을 사용하는 것이 좋음. 

부모로부터 props로 전달받은 데이터를 뿌려주고 그 데이터를 이용해 서버와 통신하면서 CRUD를 발생시킨 다음 거기서 끝나지 않고 갱신된 데이터로 추가적인 작업을 계속 할 가능성이 있는 경우.

ex) 멤버관리 모달 



-- --

**Case1의 경우**(함수로 호출)는 꼼꼼히 따져봐야함. 



**동작순서**를 확인한 결과

1. 버튼 Onclick 발생 
2. getMem 함수 호출

3. 우선 Async 로 getMembers로 groups의 데이터가 업데이트됨

   > 참고로 여기서 groups의 구조는 다음과 같고, getMember의 결과 selectedGroup의 정보가 바뀜
   >
   > groups : {
   > 	groups: [{},{},{}],
   > 	selectedGroup: {group:{}, members:[{},{},{}]}
   > }  

4. props로 connect되어있는 redux의 state가 바뀌면서 TestPage(부모)가 re-render

5. handleModal(<Child selectedGroup={groups.selectedGroup} />) 로 모달 오픈



여기서 문제는 *3.handleModal(<Child selectedGroup={groups.selectedGroup} />) 로 모달 오픈* 



groups.selectedGroup은 부모의 props인데 함께 업데이트 되지 않음. 

추측컨데,  '2.함수호출' 단계에서 이미 내부적으로 자식이 되는 컴포넌트에 넣을 값을 가지고 있다가, async가 끝나는 시점에 실행만 해주는 것 같음.

만약 async가 아니라고 생각하면 쉽게 이해가 될 것임. 동시에 하던 작업을 단지 기다려 준 것.



> 즉, 
>
>  알바생 혼자 일하는 카페에서 한 일행이 허니브레드(getMember)와 아메리카노(handleModal)를 주문했음.알바생은 허니브레드가 구워지는 동안 아메리카노를 완료함. 하지만 하나의 주문이므로 아메리카노만 먼저 내보내지 않고, 허니브레드까지 다 준비되고나서 손님에게 호출벨을 누름.
>
> 
>
>  만약 아메리카노는 이미 다 준비가 되어있고, 허니브레드를 굽고 있는 도중에 손님이 아메리카노를 다른 메뉴로 바꾸겠다고 하면?  인정상 바꿔줄 수도 있지만 그래도 손해를 입는 것임. 실제로 음식점에서 메뉴 변경을 위해 음식 준비 들어갔나요???? 라고 다급하게 물어본 경험이 한 번씩은 있을 것.
>
> 
>
>   하지만 매우 아쉽게도 주문과 동시에 두가지 음식의 조리를 시작하여 나의 간절한 마음과는 달리 결과적으로 처음 주문했던 메뉴를 먹게되는 것과 같은 슬프지만 이치. 



사실, async만 아니었어도 이미 모달은 열리고도 남았음. 

(즉, 손님 빵은 5분 정도 소요되니 음료 먼저 드리겠습니다.인 경우.. 대부분의 음식점에서는 음식이 완성되기 전에 국룰(?!)로 음료수나 맥쥬가 먼저 나오지유?)



버튼을 반복해서 누른 결과 모달의 selectedGroup의 값을 확인하면 한개씩 밀려서 나오는 것을 확인할 수 있음.

> 클릭 1 : 빈값 ( = redux state의 initial_state 값)
>
> 클릭 2 :  1 실행에서 업데이트된 props.selectedGroup 값
>
> 클릭 3 :  2 실행에서 업데이트된 props.selectedGroup 값
>
> 클릭 4 :   3 실행에서 업데이트된 props.selectedGroup 값
>







결론은 react + 함수 실행시점의 복합적인 문제였음. 

Case1은 데이터 추가 작업이 없는 간단한 modal을 간편하게 만들때 사용해도 좋음. handleModal(<Child />)

Case2는 부모가 전달해 준 props로 데이터 작업을 하고, 그 이후에도 지속적, 밀접하게 연관되어 있는 경우 사용할 것. 

  



-- --



### 그런데 이럴거면 왜 redux를 쓰지?



사실 이 문제로 거의 10일 동안 모든 개발이 stop되었음. 그리고 redux와 atomic-design의 궁합이 잘 맞지 않는다는 생각이 들었음.(응?)



redux나 context의 큰 장점 중 하나는 트리 깊이에 상관없이 어디서든 관련 데이터를 업데이트하고, 받아오고 하는 것인데

atomic-design은 주로 page에서 데이터 작업(container로서의 기능)을 하고, 그 아랫단계로 이를 props로 전달전달전달해서 presentation으로서의 기능을 할 뿐이므로, 큰 장점이 하나 사라지는 느낌이 들었음...



또한, atomic-design은 초반 component들의 구성에 있어서 상당한 노력과 경험이 필요할 거 같음.ㅠㅠ..

하지만 어떤 일이든 template화, 자동화는 결국 경험과 수많은 시도의 산물이라고 생각함.  그래도 이게 잘 됐을때 어마어마한 생산성과 통일성을 갖추게 되는거 같음.



propTypes 정의라도 열심히 해둬야하는데 쉽지가 않네. T.T 반성..



friends 페이지에서 느낀점과 지적받은 점들을 고려해서 다음 페이지(my Simtime) 개발은 새롭게 Atomic-Design을 구성해보고 후기를 쓰겠음! ㅠㅠ 



 

 

























