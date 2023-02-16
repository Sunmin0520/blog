---
title: '[node.js] 텍스트 파일에서 읽은 데이터에 정규식 적용 후 새로운 파일로 작성'
date: 2023-02-07 08:07:07
category: 'nodejs'
draft: false
---

> 주소 데이터를 ‘시’, ‘군’, ‘구’ , ‘동’,  ‘읍’,  ‘면’, ‘리’, ‘길’ 등으로 분류해서 데이터를 다시 정리한 후 학습을 하는 업무가 있었다.    
> 전체 데이터셋 개수는 14만여개인 텍스트 파일이었지만,   
> 이미 어느 정도 구역별로 6개의 파일로 분류가 되어 있는 데이터를 제공받아 사용하고 있었기에 데이터 분류 작업은 1시간 내에 끝날 것이라고 예상했다.      
> 하지만 결론적으로는 좀 더 많은 시간이 걸렸다.       
> 이제 와서 생각해보면 사고의 방향만 살짝 틀면 너무나 빠르고 간편하게 할 수 있었어서 소중한 시간을 더 소모한 것이 아쉽지만,     
> 이렇게 배웠으니 다음에는 더 잘할 수 있으리라는 믿음을 가지고 기록을 남겨본다.      

### 시도 1.  

**처음에는 가장 기본적으로 vscode의 텍스트 검색으로 6개 파일 중 내가 필요한 5개 파일 각각에서 정규식으로 단어를 찾아서 복붙할 예정이었다.**  
5개 파일의 내용을 묶은 새로운 파일을 만들어놓았지만, vs code 텍스트 검색은 반복을 돌려야하는 전체 데이터의 개수가 특정 수를 넘어가면 아주 느려지기 때문에 그 파일은 사용하기 어려웠다.  
예전에 대용량의 텍스트 파일 작업시 사용했던 BBEdit을 다시 설치해서 사용해볼까 싶었지만,   
금세 끝날 작업이라 생각했고 파일 수도 몇 개 안 되기에 설치가 더 귀찮았다 🥲    
(나중에는 BBEdit으로도 작업을 했는데 대량의 데이터를 다루기에는 확실히 vs code보다는 수월하지만,  
vs code와 달리 없는 기능도 있어서 BBEdit, vs code, excel을 혼용해서 사용하는 것이 가장 좋다.)  
그래서 ‘시’ 정보를 찾는 것이면 `[가-힣]시$` 로 각각의 파일에 대해 검색을 해서 데이터를 찾을 예정이었다.  

사실 이렇게 작업을 하면 되기는 하는데, 문제는 raw data 였다.   (이미 정리가 된 데이터였지만, 내가 사용할 input은 이 데이터였으니 raw data라고 명시)  
시, 군, 구 등이 어느 정도 각각의 파일에 나뉘어져 분류되어 있었지만, 그 **어느 정도**가 문제였다.   
한 파일에 [도, 시, 동, 가, 면, 읍]의 정보가 모두 있기도 하고, [군, 구, 시] 정도로만 분류가 되어 있어도 아래처럼  순서가 뒤죽박죽이어서 내가 원하는 정보만을 찾아서 복붙하기가 번거로웠다.  

```js
울릉군
창원시
마산합포구
마산회원구
진해구
진주시
통영시
```

하려면 할 수는 있지만, **14만 개가 넘는 데이터에서 내가 원하는 데이터를 1개도 빼놓지 않고 모두 잘 가져오리라는 보장을 하기 어려웠다.**

### 시도 2.  
빠르게 끝내는 것이 목적이었기 때문에 **가장 익숙한 JS를 이용해보기로 했다.**  
10개 미만의 파일이었기 때문에 새로운 것을 적용해서 데이터를 거르기에는 기회 비용이 더 크다고 생각했다.  
그래서 텍스트 파일에 대해 배열을 생성한 후 배열의 각 요소에 대해 정규식으로 데이터를 거를 예정이었다.   

배열 생성 후에 데이터를 가져오는 것까지는 문제가 없었는데, 문제는 데이터셋의 크기와 그에 따른 속도 저하였다.  
한 파일당 수만 여개의 텍스트가 있다보니 텍스트 요소를 담고 있는 배열로의 변환 자체가 오래 걸렸고,   
변환된 데이터 중 정규식으로 원하는 것만 골라 담아 콘솔에 표시하면 수백개가 넘어서 100번 째 인덱스 이후 부분은 `…293 more items` 처럼만 명시되었다.  

물론 파일마다, 정규식마다 결과 개수가 달랐기에 모든 길이만큼 결과를 표시하는 반복문을 작성할 수도 있었다.  
하지만 1번 파일에서 ‘동’에 대한 정보를 찾고, 2~5번 파일에서도 그 과정을 반복하고, 그 이후에는 ‘길’에 대한 과정을 동일하게 반복하는 것이 비효율적이라는 생각이 들었다.      
이 역시 각각의 파일들에 대해 특정 정규식을 찾는 반복문을 작성할 수도 있었지만 말이다.  

작업을 하다보니 raw data에 중복 데이터도 있었는데 이것을 Set 등으로 걸러내서(여러 파일 중 어떤 파일에서 가져와도 되기에 원래 어떤 파일에 있었던지 등의 순서는 필요없었다) 할 수도 있었지만,   
복잡한 작업을 하는 것이 아님에도 불필요한 과부하로 맥북에서 계속 이륙하는 소리가 났기에 이건 좀 아닌 것 같다라는 생각을 했다.  

### 시도 3.  
시도 2까지만 마치고 집에 가는 도중, node.js의 readFile로 텍스트 파일을 읽고, 그 내용 중 정규식으로 필터링한 데이터를 writeFile 하면 훨씬 빠르게 되겠다 싶었다.  
최근에 직접 readFile, writeFile 관련 코드를 작성해보지 않아서 이것에 대해 잊고 있던 것이 부끄러웠다.  
그래서 아래처럼 간단하게 코드를 작성했다.   

```js
const { promises: fsPromises } = require("fs");

function readFile(filename) {
  return fsPromises
    .readFile(filename, "utf-8") //특정 path의 파일을 텍스트 파일을 읽음
    .then((data) => {
      const originalArr = data.split(/\n/); //텍스트 파일의 내용을 각각의 단위로 잘라서 originalArr 배열 생성
      const set = new Set(originalArr) //raw data 중 중복을 걸러내기 위해 사용
      const uniqueArr = [...set]
      const result = uniqueArr.filter((word) => word.match(/[가-힣]구$/)); //'구'로 끝나는 데이터만 filter해서 result에 담음
      return result; // 원본 파일에서 중복만 제거하려면 return uniqueArr을 return 하면 된다.
    })
    .  catch((err) => {
      console.log(err);
    });
}

readFile("읽을 파일명") //파일 읽기
.then((data) => fsPromises.writeFile("./result.txt", data + "\r\n")); //result의 내용을 result.txt라는 파일에 작성
```

이렇게 하니 5개 파일을 모두 합한 파일에서 필요한 데이터를 빠르게 읽을 수 있을 수 있어서 무척 편리했다!  
무언가 일이 잘 안 되면 잠시 다른 공간과 방향에서 생각해보자는 결론을 다시 한번 얻었다.