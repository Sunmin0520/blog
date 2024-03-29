---
title: '[회고] 2024년 2월'
date: 2024-03-02 16:11:07
category: 'retrospective'
draft: false
---

2월은 정말 힘들었다. 

# 왜 힘들었을까.

### 1. **일정의 압박과 과로**
- 일이 많았다. 일이 적은 사람은 늘 일이 적은 것을 봐오기도 했고, 나는 같은 시간 대비 더 많고 중요한 업무를 해내고 싶고, connecting the dots을 신뢰하기에 나는 일이 많은게 좋다. 
물론 한계점이 있기는 하지만 말이다.
- 회사에서 내가 담당하는 업무는 크게 본개발과 데모로 크게 2가지로 나누어볼 수 있다.
    
     둘은 스펙이 다르기에 둘다 각각 다른 코드로 병렬적으로 대응을 해야했고, 
    최근에는 특히 일정 압박에 시달렸다. 
    그렇게 일정 압박 속에 짠 코드이기에 버그가 생기면 두려웠다. 
    그 버그의 원인이 내가 짠 코드일 수도, 원본 데이터의 잘못일수도, 타 팀의 잘못일 수도 있지만 
    전체 프로세스의 초반부에서 나의 코드를 거쳐 진행되기 때문에 잘못의 원인이 어디에 있는지 판단하는 것부터 나의 일이었다. 
    PM으로부터 문제를 받아든 이후에는, 원본 데이터를 구해서 동일한 상황을 구현하고 내 코드 이후의 진행되는 코드까지 거쳐서 최종적으로 문제가 된 코드를 알아냈다. 그리고 그 원인이 내 코드였든 아니든, 할 수 있는 한으로는 최대한 타팀에서 할 수 있는 해결책을 강구해서 PM에 공유했다. 
    내 코드의 문제가 아닌 이상 굳이 해결책까지 내가 제안해야하나라는 생각이 들기도 했지만, 어차피 원인을 찾기 위해 타 팀과 이야기를 하다보면 해결책이 나오기 마련이었기에 그 과정이 그리 힘들지는 않았다. 
    다만, 프로젝트의 처리 순서상 초반부에 있음으로써 오는 피로감과 압박이 컸고, 현재도 크고, 이 시행착오들로 미래는 조금씩 더 발전하겠지만, 여전히 압박이 있을 것 같다. 
- 다양하고 새로운 업무가 계속해서 들어왔고, 2월에 있던 8일간의 주말 중 4일을 일했으니 지칠만한 것 같기도 하다.
  
### 2. **해도 티가 덜 나는 일을 끝내야하는 의무**
- 중요도가 같은 일이어도 했을 때 티가 적게 나는 일과 크게  일로 나눠볼 수 있는 것 같고, 2월의 나를 가장 힘들게 했던 것은 이것이었다.
데모를 진행하기 위해서는 PM이 데이터를 주면, 나는 그들이 쓸 수 있는 인덱스 형태로 정보를 가공해야했다. 
하나하나 PM이 원하는 형태의 변수로 조정해야하는 것들이 많았고, 데모는 일정이 특히 급박하게 진행되고 그러한 세부사항은 PM이 더 잘 알고 있기에, 나보다는 PM이 이것을 조절하는 게 맞다고 생각했다. 
무엇보다도 충분히 PM이 책임질 수 있는 일임에도 내가 해당 데이터의 오류까지 잡아가며 업무를 하는 것에 있어서의 피로감이 컸다.
이 일을 하는 사람은 오직 나 뿐이었기에 내가 덜 힘들기 위해 어서 무언가를 만들어서 장기적인 내 시간을 아껴야했다.
- 그래서 PM이 작업할 수 있는 형태로 쉘 스크립트 파일을 만들었다. 
해당 업무 특성상 특정 조건일 때 순서에 맞춰 진행되는 것이 많았고, 1번 조건의 output이 2번 조건의 input이 되어 서로 변수를 주고받을 수 있는 형태여야 하기에 swagger로 만들기에는 요구사항의 충족이 어려웠다.
    
    물론 프론트엔드가 참여했다면 조금 더 나을지 몰라도, 그럴 수는 없는 상황이어서 쉘 스크립트 파일을 만들고, 해당 파일과 자세한 사용방법을 전달하려고 했다. 
    
- 기존에 나의 로컬에서는 파일 자체의 실행으로 이루어지는 부분들에 대한 모든 api를 만들고, PM에게 공유되는 쉘 스크립트에서는 해당 처리 로직이 직접적으로 노출되는 것을 막아야한다는 대표님의 의견에 따라 1개의 쉘 스크립트로 처리되던 내용을 2개의 쉘 스크립트 파일로 변경해야했다. 쉘 스크립트 파일 1개는 로컬에, 나머지 1개는 사내의 namespace 중 하나에 올려서 로컬로부터 파일을 업로드 및 다운로드하고, 컨테이너에서 해당 파일에 대한 처리가 이루어져야했다.    
또한 컨테이너 상에서 테스트를 해야하기에 api 바꾸고 테스트를 위해서는 그 때마다 빌드, 배포 혹은 docker-compose를 해야하는 상황에도 지쳤는지도 모르곘다.
- 초기에 기획했던 부분에 비해 매 과정마다 추가적으로 필요한 api 가 많았고, 팀즈를 통해 요청 받아왔던 것들에 대해 추가작업을 하느라 지체되기도 하고, 혼자서 진행을 하는 부분이다보니 가이드를 요청하기도 어려웠다. 물론 그럼에도 팀 내의 믿고 의지하는 분께 소중한 조언을 많이 들어서 이 정도에서 1차를 마무리할 수 있었지만 말이다.    
shell script, python, docker, kubectl 등을 모두 한꺼번에 사용해보는 것도 처음이기도 했지만
이것을 빨리, 잘 작동하도록 끝내야 앞으로의 내가 편한데 그 효용가치를 아는 사람은 나뿐이고, 다른 업무의 압박들 속에서 이것도 해내야해서 조금 더 외로웠고 어려웠던 것 같다. 
PM 입장에서는 쉘 스크립트보다는 나에게 팀즈를 보내서 처리를 요청하는게 훨씬 수월하고, 그들이 준 데이터에서의 오류도 내가 수정해서 작업해왔으니 이 자동화를 안 반겼을 수도 있다.
- 그런 과정에서 오기가 들었던 것도 있고, 이것을 끝내야 할 수 있는 다른 업무들이 있었기에 결국 시간을 더 쓰는 수밖에 었었다. 2월 중순쯤 부터는 매일 야근과 주말 근무를 했고, 그렇게 만든 버전 1.0.0을 자세한 동영상 튜토리얼과 문서를 적어 PM에게 공유했다.  
쉘 스크립트여서 낯설 수 있을 것 같다고는 예상했지만, 지난 주에는 그 문의에 대응하는 것 자체에만도 꽤 큰 에너지를 소모했다. 
또한 우회해서 회피할 수 있는 버그, 당장 해결이 필요한 버그, 앞으로 개선이 되었으면 하는 방향 등에 대해 파악하고, 이 작업을 위해 시간을 낼 수 있는 때를 찾는 것 등등이 모두 나의 장기적인 시간을 절약하기 위해 필요한데, 이 업무를 나만 해왔다보니 이러한 스트레스를 아는 사람은 없고.. 
결국 나 혼자 해결해야하는 문제라는 사실이 외롭고 막막했던 것 같다.

### 3. **과로에서 비롯된 단조로운 일상생활**
- 퇴근하고 집에 오면 밤 11시쯤 되었고, 이것 저것 하다보면 자정을 넘긴다. 대면회의가 잦아서 재택근무의 횟수가 자연스레 줄어들었고, 피곤했다.
출근을 아침 9시에 한 것은 아니어서 여유로운 아침시간을 보낼 수 있을 것 같았지만, 피로감이 누적되면서 운동이나 독서  등으로 일상에서 일과 분리되는 시간을 가질 의지가 생기지 않았다. 
그래서 기분은 더욱 악순환이 반복되었던 것 같다.
- 피곤하니 몸은 더욱 안 좋아지고, 잠을 충분히 자는 날에도 피로가 회복되지 않고, 시력은 점점 안 좋아져서 사소한 것에도 짜증이 나는 경우가 많았다.

# 그래서 3월에는 이렇게 할 것이다.

### 1. 힘들면 힘들다고 말하자. 
- 나는 의사표현이 명확한 사람을 좋아한다.  그리고 개선의지나 방향이 없는 막연한 불평, 힘듦에 대해 답없는 푸념 혹은 토로를 하는 사람은 좋아하지 않는다.  
그래서 나도 나의 부정적인 감정을 잘 털어놓지 않는 편이다.
하지만 오늘 상담을 받으면서 깨달았다. 힘들면 힘들다고 이야기를 했어야했다. 단, 합리적이고 이성적인 업무 및 일정 조율에 대한 제안과 함께 말이다. 
- 나는 나의 업무 혹은 내가 대체되는 것에 대한 두려움에 그런 이야기를 하는 것을 망설여왔다. 
하지만 나의 건강을 해쳐가면서 일해도 오히려 그건 나의 잘못이고, 아무도 알아주지 않는다는 것을, 아무도 알아줄 필요도 없음을 깨달았다.
오늘 당장 일하다가 죽을 것이 아닌 이상, 가장 중요한 것은 지속 가능하게 일하는 것이었다.   
내일 당장의 급한 일이 있지 않는 이상, 오늘의 과로가 내일 악영향을 준다면 그것은 옳은 방향이 아니다.

### 2. 야근은 최대 주 3일만 한다 & 달리기를 주 3회 한다
- 야근은 최대 3일로 제한하고, 가능한 지양한다. 대신 출근 시간을 조금 더 당기고, 출근 이전에 Me time을 가지려고 노력한다.
현재의 생활 패턴을 조금 앞당기고, 약간의 노력만 한다면 충분해진다. 
신경쓰지 않아도 될 것들은 무시하고, 나에게 있어 장기적으로 좋은 영향을 줄 수 있는 것들에 집중한다. 
- 달리기를 통해 규칙적으로 업무에서 벗어나는 시간을 가진다. 좋은 노래도 듣고, 땀흘리며 얻는 즐거운 기분은 덤!

### 3. 나를 보듬어주자.
- 문제를 해결했을 때의 희열이 너무나 커서 그 과정의 힘듦을 잊는 것이 좋을 수도 있지만, 체력적으로는 반드시 좋은 것만이 아님을 깨달았다.
- 달리기, 여행, 독서 모두 그 과정 자체를 즐기는 것처럼, 업무를 하는 과정에 있어서도 나를 너무 가혹하게 몰아가지 말고, 보듬어주면서 지속가능하게 일하자.