## 4. 노드 내장 객체 알아보기
### 1. global
- 브라우저의 window와 같은 전역객체
  - 예) require, console도 모두 global.require, glabal.console 
- 전역객체이기에 남용하면 프로그램 규모 커질수록 어떤 파일에서 global객체에 값 대입했는지 알기 힘들다. 즉 유지보수 어려움. 
  - 다른 파일의 값을 사용 원한다면 모듈 형식 사용                

### 2. console 
- console.dir는 console.log와 달리 객체 구조 잘 표현                        

### 3. 타이머 (global에 있음)
- setTimeout(콜백, 시간), setInterval(콜백, 시간), setImmediate(콜백)는 ID를 반환하고, 이 ID를 통해 타이머 취소 가능(clearTimeout, clearInterval, clearImmediate)
- setImmediate(콜백)와 setTimeout(콜백, 0)의 차이?
  - 둘다 콜백함수는 이벤트 루프를 거친 뒤 즉시 실행. 단, 파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백함수를 호출하는 경우에는 setImmediate이 setTimeout보다 먼저 실행. 하지만 항상 그런 것은 아니므로 setTimeout(콜백, 0)은 사용 안하는 것 권장

### 4. __filemname, __dirname
- 현재의 파일명과 파일 경로/ path모듈과 주로 함께 사용

### 5. module, exports, require

### 6. process
- process.env: dotenv와 함께 사용
- process.nextTick: 이벤트 루프가 다른 콜백함수보다 **nextTick의 콜백함수를 우선적으로 처리하게 함**
    - microTask: process.nextTick, resolve된 프로미스 등. 
- process.exit: 실행 중인 노드프로세서를 종료
  - 0 혹은 번호 없음: 정상 종료/ 1: 비정상 종료

## 5. 노드 내장 모듈 사용하기
### 1. os
- 브라우저와 달리 노드는 os 모듈에 운영체제의 정보가 담겨있어서 그것을 가져올 수 있다.
- 일반적인 웹서비스 제작시에는 사용 빈도 적고, 운영체제별로 다른 서비스의 적용 등 컴퓨터 내부 자원에 빈번하게 접근하는 경우 사용

### 2. path
- 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈(운영체제별로 경로 구분자(맥 /, 윈도우 \)가 다르기 때문에 유용


