---
title: '[CS] 파일 권한 문제로 command not found가 나올 때 '
date: 2022-02-14 21:49:07
category: 'cs'
draft: false
---

## 문제 상황
- 쉘 스크립트 파일을 실행하려고 하는데 아래와 같은 오류 발생

```js
➜  test ./run-test.sh
zsh: permission denied: ./run-test.sh

//permission denied가 나와서 sudo로 시도
➜  test sudo ./run-test.sh
Password:
sudo: ./run-test.sh: command not found 
```

- command not found가 나와서 PATH와 관련된 사항일 것이라 생각해서 찾아보았으나, 해결되지 않음

## 문제 해결
- `ls -l`로 파일 권한 보기
```js
-rw-r--r--  1 sunmin  staff  0  2 14 21:54 run-test.sh // 실행할 권한이 없음
chmod u+x run-test.sh //파일을 소유한 사용자(u)에게 실행할(x) 권한 추가(+)
//chmod g=r test.sh :그룹(g)에게 읽을(r) 수만(=) 있는 다양한 권한 설정이 가능하다.
```
- 실행할 수 없는 파일이었는데 실행을 하려 하니 command not found가 나왔던 것으로 예상된다.  
  command not found가 나올 때는 항상 특정 모듈이 없거나, PATH 관련 이슈였는데 실행 권한이 원인인 것은 처음이어서 재밌었다.