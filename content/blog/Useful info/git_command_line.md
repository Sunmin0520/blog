---
title: '자주 쓰는 command line'
date: 2021-1-31 07:36:00
category: 'Useful info'
draft: false
---
## 아직 push 하지 않은 커밋을 취소하고 싶을 때

`git reset HEAD^`

- 에러 상황: a라는 커밋메세지 적었으나 push과정에서 에러가 난 상황 
- 이 command line을 적지 않으면 이후에 b라는 커밋메세지를 남겼을 때 push가 되었을 때 a,b 다 올라감 → 그것을 의도하지 않는다면 정리 필요



## 'error:failed to push some refs to remote주소'가 나올 때

<div align="center">
  <img width="500px" src="https://user-images.githubusercontent.com/60782131/106369849-2319bc00-6398-11eb-8fa4-3a5c850853f3.png" />
  <br />
</div>

- 해결 `git pull origin master --allow-unrelated-histories`
  
## 직전의 커밋 메세지를 수정

`git commit --amend -m "Add user crud"`  수정할 메세지 입력 → `git push --force` 수정사항 반영

- 협업시의 리모트에서는 force를 쓰는 것을 주의!

## 새 브랜치 생성 및 이동

`git checkout -b feature/userCRUD` 생성할 브랜치 이름 입력 & 이동


