---
title: '[CS][OS] 프로세스 관리 '
date: 2022-03-13 17:03:07
category: 'cs'
draft: false
---

# Job vs Process
- job: 실행할 프로그램과 그것의 데이터
- process: 실행 위해서 메모리가 할당된 Job
    - 커널이 프로세스에게 리소스를 할당
- PCB: 커널이 프로세스 관리에 필요한 정보를 저장하는 자료 구조(프로세스를 표현하는 구조)
    - 저장하는 정보: PID(프로세스 고유 식별번호), 스케줄링 정보, 프로세스 상태, 입출력 상태 정보, context save area 등

# Process
<img src="https://user-images.githubusercontent.com/79896443/158051464-d72aae90-f957-429f-ba45-3d6f64dd508f.png">

### Active
- ready: 즉시 실행 대기 상태
- running: 실행
- preemption: running 끝나고 프로세서의 스케줄링에 따라 ready로 이동
- sleep: I/O등의 작업 필요할 때 block 필요

### Suspended
- 현재까지의 상태 저장 위해 swap device(프로그램 정보 저장위한 파일 시스템)에 memory image 보관

### Terminated
- 커널 내에 일부 PCB 정보만 남아있고 수집(이후의 프로세스 관리 위해) 끝나면 그것도 삭제


# Interrupt
<img src="https://user-images.githubusercontent.com/79896443/158052066-8044016b-21d1-4e91-98b3-cbe052caa746.png">

## context switching
- context: 프로세스와 관련된 정보들을 모아놓은 것
- 저장장소에 따른 분류
    - CPU: CPU register context
    - 메모리: 코드, 데이터, stack, PCB 등
- context switching = context saving & context restoring 

<br />
<br />
<br />

**출처**
- https://www.youtube.com/watch?v=jZuTw2tRT7w&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=5&ab_channel=HPCLab.KOREATECH
- https://www.youtube.com/watch?v=MJTr37lgaMA&list=PLBrGAFAIyf5rby7QylRc6JxU5lzQ9c4tN&index=6&ab_channel=HPCLab.KOREATECH