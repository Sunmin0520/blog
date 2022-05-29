---
title: '[회고] 사내 서비스 연동 프로젝트'
date: 2022-05-29 17:16:07
category: 'retrospective'
draft: false
---

# 업무

사내 서비스 중 하나로 챗봇이 있고, 사용자가 쿼리를 보내면 자연어 프레임워크를 거쳐 응답을 생성해서 사용자에게 보낸다.  
이 과정에서 사내의 다른 서비스에서 사용하는 자연어 프레임워크의 결과값과 연관된 응답을 사용자에게 보내야할 일이 생겼고, 이 과정에서 서버 생성을 담당했다.  
평소 우리 팀에서 하는 것보다 간단한 업무였고, 자유도도 높았다.  
그래서 빠르게 개발을 위해 익숙한 Node. js & express 조합으로 서버를 구성했다. 


# 배운 것

- 처음에 설계를 잘하자. 

    - 어떤 것은 어떻게 할지 미리 결정을 하고, 작업에 들어가면 훨씬 빠르고 쉽게 맞는 방향으로 속도를 낼 수 있다.  
    늘 지향하는 방법이지만, 사수 분과 작업 전에 확인을 하면서 우선 필수적으로 개발해야하는 것을 정리할 수 있어서 좋았다.  
    부가적인 기능을 신경쓰느라 필수적인 기능을 놓칠 수 있으니 늘 무엇이 중요한지, 그 기능이 잘 작동되는지를 확인해 한다. 

- 외부 서버 접속
    - 문제: 클라이언트에서 제공하는 내부 서버에 접속해서 정보를 얻어와야 했는데 접속을 시도하면 `Unable to verify the first certificated` 와 함께 400 bad request가 나왔다. 
        - 원인: httpsAgent 기능은 데이터 보내기 전에 신뢰할 수 있는 인증서를 사용하는 서버에서 보낸 정보인지 브라우저가 확인한다.
        - 해결
          - 요청시 사용자 지정 Agent를 정의하게 되는데  SSL 인증 이슈를 무시하도록 https의 verifier를 사용하지 않는 옵션을 추가했다.  
          Axios의 인자값으로 `httpsAgent: new https. Agent({ rejectUnauthorized: false }`를  추가했다. 

- swagger 설정
  - 1.
      - 문제: endpoint와 그 endpoint와 매칭되는 method는 1개였지만, 쿼리에 따라 다른 함수를 호출하고, 그에 따른 응답을 보내야했다.  
            postman을 통해 응답을 보내는 것까지는 잘 되었지만, swagger에서는 한 가지 상태코드에 대해서는 한 가지 형태의 응답형태만 정의할 수 있었다.  
            타 팀과 공유하려면 모든 응답의 형태에 대해 swagger에 반드시 정의해야했다. 

      - 해결: 응답의 객체 내부의 값은 다르지만 형태 자체는 모든 쿼리가 동일하게 가져갔기에, example을 여러 개 만드는 방식으로 해결했다.  
      따라서 try it out을 했을 때의 요청과 관계없이 여러가지의 응답을 볼 수 있게 해서, 현재의 요청이 어느 형태의 응답인지 확인할 수 있게 했다.

    - 2.
      - 문제: try it out을 했을 때, req. body가 undefined로 인식되었다.   
        swagger에 나오는 curl로 요청을 보냈을 때에도 요청에 따른 응답이 제대로 나오지 않았다. 

      - 해결: openAPI 3. 0버전에서는 req. body를 보내는 방식이 변경되었다는 것을 stackoverflow에서 본 후, 양식에 맞게 수정했다. 

            ```
            //수정 전에 요청을 보내는 부분의 swagger docs
             *      parameters:
             *      - in: "body"
             *        name: "body"
             *        schema:
             *          $ref: '#/definitions/Request'
            
          //수정 전의 curl 명령어
            curl -X 'POST' \
              url \
              -H 'accept: application/json' \
              -d ''
            
            ```
            ```
             //수정 후에 요청을 보내는 부분의 swagger docs
             *      requestBody:
             *        content:
             *          application/json:
             *            schema:
             *              $ref: '#/definitions/Request'
            
             //수정 후의 curl 명령어
            curl -X 'POST' \
              url \
              -H 'accept: application/json' \
              -H 'Content-Type: application/json' \
              -d '{
              "query": "클라이언트의 쿼리"
            }'
            ```
            
- github action
    - 평소 팀에서 쓰던 github action 관련 파일을 자세히 보고, 이번 프로젝트에 맞게 적용할 수 있었다. 

    - 사이드프로젝트를 하면서 어서 github action , docker 관련해서 익숙해지고 싶다.

- 타 팀과의 협업
    - 작은 프로젝트였지만 엮여있는 팀이 여럿이어서 다 같이 소통하는 재미가 있었다. 


# 느낀 것

- 새로운 스택으로 도전해보자
    - 편하다는 이유만으로 express로 서버를 구성해왔다. 개인적으로 좋아하기도 하고, 팀에서 사용하기도 해서 더욱 익숙하다.  
    하지만 이제는 정체되어 있다는 느낌을 받았다. 새로운 것의 배움을 적용해서, 작동하는 서비스를 만들어봐야겠다. 


- 책임감을 가지자
    - 사수 분께 물어보지 않고 스스로 끝내서 좋았다. 여쭤본 것이 있기는 했지만, 여쭤본 날 밤에 스스로 해결해서 기분이 좋았다.  
    책임감을 가지고, 계속 배우자. 
