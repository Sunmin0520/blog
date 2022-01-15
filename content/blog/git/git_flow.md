---
title: '[git] git flow'
date: 2021-04-15 22:06:07
category: 'git'
draft: false
---
<p>
<img src="https://user-images.githubusercontent.com/60782131/114875191-038f1d00-9e38-11eb-92fd-a559510cfd99.png">

- master → develop → feature, hot fix, release
- master: master에 변경내역있다면 production에 배포되는 것 
- develop: hotfix 제외하고는 모든 변경내역은 develop에서 시작
- feature: develop에서 생성하고, 기능 완성되면 develop에 merge
- release: develop에서 생성하고, master나 develop에 merge
- hotfix: master에서 생성하고, master와 develop에 merge
  
<br/>

- 순서
  <img src = "https://user-images.githubusercontent.com/60782131/114877791-97fa7f00-9e3a-11eb-9366-417022df17e4.png">
  1. 로컬 저장소 생성
  2. README.md 생성(master에 무언가 push하고, master-devleop-feature로 가기 위해 이용)
  3. git init
  4. git add, commit
  5. git remote add origin & git push origin master
  6. git checkout -b develop → 작업

<br/>

- feature에서 작업 중이고, develop에서 push되었고 feature에서 필요한데 pull하지 않은 코드가 있다면?
  - stash → develop으로 이동 → git pull. 즉 **feature에서 develop을 pull하지 않는다.**

<br/>

- upstream, downstream, origin
  - 내가 어떤 레포를 pull하면 그 레포가 upstream, 내 레포가 downstream. 상대적
  - 한 레포(original repo)를 clone하면 default remote가 origin. 즉 **내 레포가 origin**.  original repo를 추적하려면 'git remote add upstream 주소' 로  추가해야함 

<br/>

- HEAD
    - 현재 작업중인 브랜치를 가리킴. master에서 작업 중이면 head는 master에 있고, feature에서 작업중이면 head는 feature에 있다.
    - 'git reflog'로 확인 가능
  
<br/>
<br/>

**출처**

- https://www.holaxprogramming.com/2018/11/01/git-commands/

</p>

