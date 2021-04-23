---
title: '컴퓨터의 동작 원리'
date: 2021-02-27 08:17:07
category: 'CS'
draft: true
---
<P>

# 1. 컴퓨터의 기본 구조
- 핵심부품: 메모리, 프로세서
- CPU와 메모리에서 지속적으로 명령어와 데이터 읽고, 때떄로 출력값이나 중간계산을 메모리에 저장

## 메모리(RAM): Random Access Memory
- 컴퓨터가 수행해야 할 명령어를 써놓는 곳, 연산의 대상이 되는 데이터 저장 
- 각 셀마다 미세한 데이터 저장 & 각 셀 구별 위한 주소 번호 매겨져 있음
- 메모리 셀 하나에 8자리의 이진수(byte) 저장
  - 읽기 모드: 메모리가 셀에 저장된 바이트를 8가닥의 데이터 전선으로 출력
  - 쓰기 모드: 전선 통해 바이트 읽어서 지시된 셀에 넣음
- bus: 한 덩어리의 데이터 전송에 필요한 전선의 모음(단방향인 주소버스, 양방향인 데이터 버스 등등)

## 프로세서(CPU): Central Processing Unit
- 메모리에서 명령과 데이터를 읽어 그에 맞게 계산 
- **register**: CPU 내부의 메모리셀
  - CPU는 레지스터에 저장된 수를 대상으로 간단한 수학 연산 수행 가능
  - RAM과 레지스터 사이에서 데이터 교환 가능
- **instruction set**(명령어 집합): CPU가 수행할 수 있는 모든 연산의 집합
  - RAM에 저장되며, 실행순서에 따라 배열해서 코드 실행
- **program counter**(PC레지스터): 다음에 수행할 명령어가 기록된 메모리의 주소를 가리키는 레지스터
  - program counter를 중심으로 CPU는 메모리의 명령어 끊임없이 수행

# 2. 컴파일이 필요한 이유

<br />
<br />

**출처** 블라드스톤 페헤이라 필루, 컴퓨터 과학 로드맵(인사이트, 2018)
</p>