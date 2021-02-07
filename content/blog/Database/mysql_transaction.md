---
title: '[MySQL] transaction'
date: 2021-02-7 17:09:13
category: 'Database'
draft: true
---
- transaction: 하나의 그룹으로 처리되야 하는 쿼리를 묶어 놓은 것
- 과정이 다 이루어져야지만 DB에 반영
- active -> partly commited -> commited: commit 실행(쿼리문과 데이터를 최종적으로 db에 반영)
-        -> failed -> aborted: rollback 실행(commit시점으로 돌아감)

## ACID: 트랜잭션의 특성
- Atomicity원자성: 트랜잭션의 작업이 부분적으로 실행 or 중단되지 않는 것 보장. All or Nothing
- Consistency일관성: 트랜잭션 성공시 일관성있는 db상태 유지
- Isolation격리성: 트랜잭션 수행시 다른 트랜잭션이 끼어들 수 없음
- Durability지속성: 성공적으로 수행된 트랜잭션은 영원히 반영

## Commit
- 모든 작업을 정상적으로 처리하겠다고 확정. 처리 과정을 db에 영구 저장. commit 수행 = 하나의 트랜잭션 종료

## Rollback
- 트랜잭션 중 문제 발생해서 트랜잭션 시작되기 전 상태로 되돌림. 즉 마지막 커밋 완료 시점으로 돌아감
- 보통 롤백은 작업 전체 취소. but Savepoint로 전체가 아닌 특정 부분에서 취소 가능

**출처** 
- [MySQLTUTORIAL](https://www.mysqltutorial.org/mysql-transaction.aspx/)
- [blog](https://jerryjerryjerry.tistory.com/48)
- [blog](https://victorydntmd.tistory.com/129)
