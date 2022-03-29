
조금 불분명하게 마무리가 되어서 뭔가 찝찝하지만 다음에 참고할 수 있을 것 같아 기록해두려고 한다.

- 상황: 회사 깃헙 계정으로 글로벌이 설정되어 있는 맥북에서 내 개인 계정이 팀원으로 되어있는 organizationd의 repo에 push 거절됨
```js
remote: Permission to MODENY-admin/backend.git denied to sunmincho.
fatal: unable to access 'https://github.com/MODENY-admin/backend.git/': The requested URL returned error: 403
````
사실 파일만 통째로 옮겨서 개인맥북에서 푸쉬해보려했으나 aws 키가 걸려있어서 파일을 옮기는 것만으로는 서버리스 실행이 안됨.
분명 작업할 때 회사맥북으로 하게 될 가능성이 크기에 어떻게든 해결하려고 노력함



결론적으로는 ssh key를 깃헙에 등록하는 방식.

구글링해서 나오는 첫 3개 정도 다 시도. 해결 안됨. 혹은 이때 personal이 아닌 posicube로 했으면 됐었을지도

시도1.

work, personal에 해당하는 id_rsa 파일 생성
https://blog.leocat.kr/notes/2019/05/25/github-using-multi-account에서 마지막 계정전환에서 문제가 되는 것을 알았으나 
계정전환은 회사 계정으로 보안 건드릴까봐 못해봄 그래도 상당히 유용


결과적으로 이거로 해결
https://mygumi.tistory.com/96 그대로 따라하고 해당레포(modeny-backend)의 .git에서 config
신기한건 

[remote "orgin"]

url = git@github.com-**posicube**:modeny-admin/backend.git

personal이 아닌 Posicube로 했는데 Personal로 잘 푸쉬됨

근데 개인 블로그를 이렇게 해보니 똑같이 403에러가 뜸. 이유는 모르겠지만 극복할 에너지를 현재 잃어버림. 블로그는 내 맥북으로 하는게 평일에 하긴 더 좋으니까.....


다행히 회사계정에도 레포 생성해서 하니 sunmincho로 잘 푸시됨.

근데 왜 posicube로 했을 떄 잘됐을까?



- 시도










작업 제일 좋은 순서: 제일 처음 github repo 만들기 -> 터미널 git clone -> vscode로 작업 -> add commit push   