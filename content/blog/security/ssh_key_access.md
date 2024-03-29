---
title: '[security] 회사 맥북의 글로벌 계정과 다른 개인 깃헙 계정의 repo에 Push하기 '
date: 2021-12-12 18:37:07
category: 'security'
draft: false
---
## 현재 상황 및 필요한 것
- 회사에서 사용하는 깃헙 계정과 개인 깃헙 계정이 다르다.
- 회사 맥북에는 회사 깃헙 계정이 글로벌로 설정되어 있지만, 회사 맥북으로 개인 계정 작업을 하곤 한다.

## 해결 방법
  1. **로컬**: 개인 계정, 회사 계정을 각각 이용할 때 사용할 ssh key를 구분하여 생성 
    - 개인 계정용 ssh key: id_rsa_me
    - 회사 계정용 ssh key: id_rsa_work

  2. **깃헙**: github에 public key 등록, 내 로컬에는 private key 위치
    - github/account settings/SSH and GPG keys에서
    - 개인 계정: id_rsa_me.pub 의 내용 등록
    - 회사 계정: id_rsa_work.pub 의 내용 등록 
    - `cat id_rsa_work.pub | pbcopy` 이용  

  3. **로컬**: `code ~/.ssh`로 ssh config 설정 추가
    - Host: 그 key를 사용할 이름
    - IdentyFile: 로컬에서 key의 위치

  ```
  Host github.com-work
    HostName github.com
    User git 
    IdentityFile ~/.ssh/id_rsa_work

  Host github.com-me
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_me
  ```

  4. **로컬**: 원하는 repo에서 `code .git/config`으로 설정 변경

  ```
  [core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
  [user]
    name = Sunmin0520
    email = sunmin.dev@gmail.com
  [remote "origin"]
    url = git@github.com-me:Sunmin0520/blog.git
    fetch = +refs/heads/*:refs/remotes/origin/*
  [branch "master"]
    remote = origin
    merge = refs/heads/master
  ```

## 배운 것
- ssh key 생성 및 이용
- 개인 계정과 회사 계정에 key를 반대로 등록해놓고 안 되어서 시간을 많이 썼다.  
어이 없는 실수를 하지 않았는지, 그게 정말 실수인지 무지에서 비롯된 것인지 확인하고 배워서 앞으로 그러지 않으면 된다!