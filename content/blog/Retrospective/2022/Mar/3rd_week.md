---
title: '[회고] 3월 셋째 주'
date: 2022-03-18 20:59:07
category: 'retrospective'
draft: false
---
# 뿌듯한 것
1. 작년에 이해가 안됐던 코드가 눈에 들어온다. 정말 기본 개념을 적용하는 코드를 최근에 작성했는데 사실 완전히 새롭게 알게된 것은 거의 없었지만, 완전히는 알지 못했던 것들의 퍼즐조각이 맞추어지는 느낌을 받았다. 이 이후에 이전에 잘 이해가 안됐던 코드를 하나하나 생각해가면서 작성해보고 있는데 재밌다.  (시간을 주신 팀장님 언제나 늘 감사합니다)  
과연 성장을 하고 있는걸까 라는 마음에 불안할 때도 많지만, 또 앞으로도 좌절도 계속 하겠지만, 뭐 어쩌겠어. 그래도 해야지. 좌절을 하면서 배우는 것의 장점은 그만큼 기억에 오래 가고 좋다는 것이다. 높은 회복탄력성과 함께 마음이 건강한 소프트웨어 엔지니어로 살고 싶다.

# 배운 것
1. 화살표 함수는 익명함수에만 쓴다. 
    - 너무나 당연히 항상 그래 오다가 무슨 이유에서인지 `async foo () => {}` 이런 식으로 쓰는 실수를 저질렀다.  
    아래와 같이 Syntax error라고 나왔지만, 화살표 함수 부분이라고는 상상도 못했다. node_modules를 본 결과 instantiate 에러였는데 해결은 안되고, 다른 오타는 없었기에 BABEL_PARSE_ERROR 관련해서만 찾아보는데 답이 없었다.
   
    <br/>
    <pre>
    [nodemon] app crashed - waiting for file changes before starting...
    [nodemon] restarting due to changes...
    [nodemon] starting `babel-node src/app.js`
    경로/node_modules/@babel/core/lib/parser/index.js:93
        throw err;
        ^

    <b>SyntaxError
        at instantiate (경로/node_modules/@babel/parser/lib/index.js:72:32)
        at constructor (경로/node_modules/@babel/parser/lib/index.js:358:12)
        at Parser.raise (경로/node_modules/@babel/parser/lib/index.js:3334:19)
        at Parser.unexpected (경로/node_modules/@babel/parser/lib/index.js:3372:16)
        at Parser.expect (경로/node_modules/@babel/parser/lib/index.js:4001:28)
        at Parser.parseBlock (경로/node_modules/@babel/parser/lib/index.js:15164:10)
        at Parser.parseFunctionBody (경로/node_modules/@babel/parser/lib/index.js:13864:24)
        at Parser.parseFunctionBodyAndFinish (경로/node_modules/@babel/parser/lib/index.js:13848:10) {
      code: 'BABEL_PARSE_ERROR',
      reasonCode: 'UnexpectedToken', </b>
      loc: Position { line: 9, column: 29, index: 242 },
      pos: [Getter/Setter]
      </pre>
  
      
    이렇게 어이 없는 실수는 에러메세지로 검색을 해도 그 메세지가 특정한 경우에만 해당되어 있지 않기 때문에 답을 찾기가 어려울 때가 많다.  
    실수의 원인을 알게 되면 좋지만, 그 과정에서 에너지를 과하게 소진해버릴 수 있으니 조심하자.  
    `const foo = async () => {}` 이러한 방식으로만 쓰기!
    
    <br/>

2. Prettier가 잘 되다가 적용되지 않는다면 prettier output log를 보자.
    - 이것 역시 syntax error로 안 되고 있었는데 그것을 보기 전에 우선 검색부터 해보려고 했다. 

3. unstaged 파일 및 디렉토리 삭제하기: `git clean -fd`
4. Fork
    - sourcetree를 써다가 사용 중에 갑자기 꺼져버리는 현상이 심해서 사용을 중단했었다. 사실 터미널과 깃헙이 있다면 안 써도 괜찮다 생각했는데 Fork를 써보니 소스트리에 비해 UI도 매끄럽고 참 좋다! 재미있고 유용하게 써봐야겠다.


 <br/>

# 개선할 것
1. 근무시간 외의 시간에 공부를 더 해야 한다. 이론적인 공부와 함께 궁금한 것들을 만드는 시간을 계획해야겠다.