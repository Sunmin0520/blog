---
title: '[서적] 챗GPT 개발자 핸드북'
date: 2023-08-27 15:43:07
category: 'nodejs'
draft: false
---  
<img src="https://github.com/Sunmin0520/blog/assets/60782131/99635d2f-e059-458e-8997-02cccc16f27c" width="350">  

# 이 책을 짧게 소개한다면  
‘챗GPT 개발자 핸드북’이라는 제목을 보고 어느 정도의 활용법을 알려주는 책인지 내심 궁금했었다.  
이 책의 저자이신 주한나님은 마이크로소프트의 Copilot Applied AI 팀에 소속이시기도 하고, 페이스북에 남기시는 글을 재미있게 보아왔기 때문에 책을 읽기 전부터 기대에 차 있는 상태였다.  
적어도 '수박 겉핥기는 아니겠구나'라고 예상하며 책을 펼쳤는데, 읽는 내내 “재밌다!”와 “와우 ChatGPT를 이렇게 쓸 수도 있구나!” 를 외쳤다 🙂  

# 이 책에서 다루는 내용 및 추천 이유  
이 책의 머리말에도 적혀있지만, 이 책은 LLM의 내부 구조나 이론적인 이해를 다루지 않는다.  
따라서 chapter 01의 소제목부터가 ‘LLM에 대한 뒷이야기부터’이다.  
사실 LLM 자체를 개발하는 사람이 아니라면 LLM 내부의 작동 로직보다는 ‘그래서 이걸 어떻게 해야 잘 쓸 수 있는지’가 궁금할 것이고, 나 역시 그러한 독자 중 하나였다.   
chapter 02부터 프롬프트 엔지니어링의 본격적인 예시들이 이어지고, 그 전의 chapter 01에서는 이 업계에서 오랜 시간을 보낸 시니어 엔지니어로서의 저자의 생각이 담겨있는데  이 부분도 특히 좋았다.  
정답이 없는 많은 고민들에 대해서도 가장 현실적이고 정답에 가까운 답을 들은 느낌이기도 했다.   

아래는 책의 목차에 각 챕터를 읽고 내가 생각한 챕터의 내용 혹은 부제를 ‘#’ 표시로 추가해보았다.  
***
**Chapter 01 챗GPT 골드러시** # 챗GPT가 뭘까요? 이제 개발자도 AI로 대체되는 걸까요?  
**Chapter 02 챗GPT 가볍게 시작하기** # 이렇게 다양한 예시들에 대해서도 사용이 가능합니다.  
**Chapter 03 챗GPT 조련하기** # 내가 원하는 답을 들으려면 프롬프트를 ‘어떻게 잘’ 써야 할까요?  
**Chapter 04 GPT로 개발하기** # 프롬프트를 잘 쓰는 법을 배웠으니 이를 개발에 이용해봅시다!  
**Chapter 05 GPT로 AI 애플리케이션 개발하기** # 이제 애플리케이션을 만들어봅시다!  
***
   
위의 목차에서처럼 chapter 02부터는 정말 본격적이고 구체적인 예시들이 이어진다.  
그 중 하나를 예로 들면 ‘OO 언어를 쓰고 JD의 내용은 XX인 기술면접을 보는데 이 면접에서 받게 될 질문 목록’ 이다.  
ChatGPT를 인터뷰어로 사용하여 인터뷰에 대한 연습을 하는 것은 충분히 예상 가능했지만, 이렇게 JD까지 덧붙인 구체적인 예시들이 있어서 좋았다.   
그 외에도 듣고자 하는 답이 있으면 어떻게 질문을 하는 것이 좋은지, 프롬프트를 몇 번 고쳐서 입력했는데도 이상하게 내가 원하는 답변이 안 나온다면 어떻게 해야하는지,  
다른 사람들이 작성한 좋은 프롬프트들은 어디서 참고할 수 있는지 등에 대한 정말 다양하고 구체적인 팁들이 가득하다!  
평소 주한나님의 페이스북의 글은 유용한 내용이 친근하고 재미있는 글맛으로 버무려져 있어서 좋아했는데  
이 책에도 있다보면 웃음이 나는 부분이 많다. 그러한 글솜씨도 구체적인 사용 예시들을 전해주시니 더욱 와닿았다.   

이와 동시에 이 책은 ChatGPT를 사용할 때 주의해야할 점에 대해서도 분명히 다루고 있다.   
LLM의 가장 큰 모델의 문제점으로 부각되는 ‘환각’에 어떻게 대처하고 그것을 최대한 피할 수 있는지, 프롬프트에 사용한 내용의 유출 등에 어떻게 대처해야하는지 등에 대해 알려주기에  
chapter 03의 제목인 ‘챗GPT 조련하기’라는 제목이 이보다 적절할 수 없다고 생각했다.   
chapter 04, 05에서는 위에서 다룬 내용들을 기반으로 본격적으로 개발에 사용하기 위한 구체적인 사용방법, 다양한 개념 및 예시들을 알려준다.  
예를 들어 function calling은 이 책을 통해 처음 알게 되었는데 앞으로도 유용하게 사용할 수 있을 것 같다.   
이 책을 읽은 날로부터 고작 2달 전에 발표된 내용임에도 책에 다루어져 있어서 이 책이 얼마나 최신의 내용을 기반으로 하는지 알게 되는 계기이기도 했다.    

에필로그 또한 프롤로그에서처럼 저자 분의 생각을 읽을 수 있는 좋은 마무리라고 생각된다.  
두껍지 않지만, 프롤로그부터 에필로그까지 내용이 꽉꽉 차 있는 책이다. 

# 추천 대상  
ChatGPT를 잘 쓰고 싶은 모든 사람!  
조금 더 구체적으로는 막연한 질문에 막연한 답을 얻고 싶은 사용자가 아닌,  
구체적으로 질문을 하고 싶은 내용이 있고, 그것에 대해 명확한 답을 얻고 싶은 사람에게 추천한다. 
이 책을 통해 더 좋은 답을 얻을 수 있는 많은 방법들을 배울 수 있을 것이다.

***
한빛미디어 <나는 리뷰어다> 활동을 위해서 책을 제공받아 작성된 서평입니다.