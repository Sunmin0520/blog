---
title: '[Web] 브라우저에 www.google.com을 입력하면?'
date: 2022-10-03 16:13:00
category: 'web'
draft: false
---
브라우저에 www.google.com을 입력한 이후의 진행 순서는 어떻게 될까?  
우선은 큰 그림을 그리는 정도로 개념들에 대해 알아본 후에 세부적인 개념에 대해 차근차근 톺아보려고 한다. 

## 전체 과정 

1. 브라우저에 URL을 입력하고 enter key를 누른다.
2. 브라우저는 도메인의 IP주소를 찾는다.
3. IP주소를 찾았다면 그것을 이용해 브라우저는 서버와 TCP연결을 시작한다.
4. 브라우저는 HTTP요청을 서버로 보낸다.
5. 브라우저는 요청에 대한 응답을 받는다.
6. 브라우저가 컨텐츠를 렌더링한다. 

<br/>

우선 가장 먼저 URL에 대해 알아보자. 

## URL, URI 

URI(Uniform Resource Identifier)는 리소스 식별자이고,  URL은 URI의 서브셋으로 리소스의 위치에 대한 구체적 서술이다.   
예를 들어 URI가 http://www.google.com/index/search 로 구글 도메인 안에서 search 라는 식별자를 구분하는 것이라면,  
URL은 http://www.google.com/index.html 처럼 구체적인 파일의 위치를 알려준다. 

도메인 이름을 전달받았으니 이제는 그 도메인에 해당하는 IP 주소를 찾아야 한다.   
IP 주소를 알아내는 데에는 DNS, CDN이 필요한데 그 전에 우선 IP와 IP 주소가 무엇인지 알아보자. 

## IP 

IP는 패킷(or 데이터그램) 을 서버에게 전달하고 정보를 주고 받는데에 필요한 프로토콜이다.  

## IP 주소 

IP 주소는 IP 통신에서 사용하는 네트워크에서 호스트를 고유하게 식별할 수 있는 주소이다. 같은 기기여도 접속하는 네트워크에 따라 변한다. 

IP주소는 IPv4 기준으로 4byte이다. 1byte가 2진수 8개이므로 IP주소는 0~255 중 하나의 숫자들이 모여 총 4개의 필드를 구성한다.   
예를 들어 터미널에`traceroute -q 1 www.google.com` 나 `ping google.com`을 입력시 나오는 `142.250.207.110`는  
구글의 IP 주소 중 현재의 나의 위치에서 정보를 가장 효율적으로 받을 수 있는 주소이다.  
4byte의 주소 중, 첫 번째 필드의 값을 기준으로 클래스를 나누는 방식이 Classful network이다.  
반면, Classful network에서 비효율적인 IP할당을 구분하기 위해 나온 개념이 Classless Network이고, 서브넷을 사용한다.   
그러면 www.google.com이라는 도메인이 어떻게 `142.250.207.110`이라는 IP주소와 연결되는 걸까? 이것에는 DNS가 필요하다.

## DNS 

DNS(Domain Name System)는 도메인 이름을 IP 주소로 변환해주는 시스템이다.   
[WHOIS](https://whois.nic.or.kr/) 에서 아래의 IP주소를 입력해보면 이는 구글에서 관리하는 것임을 확인할 수 있다. 

<img src="https://user-images.githubusercontent.com/79896443/193521033-176f8ada-6ef6-44e7-8031-14f150089456.png" width="500">

DNS를 통해 도메인의 IP주소를 알아냈으면 이제 TCP 연결이 시작된다. (IP는 비신뢰성, 비연결성이 특징이므로 정확한 패킷의 송수신이 일어나려면 TCP가 필요하다.)  
HTTP 요청을 보내기 위해서는 TCP 연결 설정이 필요하기 때문이다.  
그러면 먼저 TCP가 무엇인지 알아보자. 
그런데 TPC와 IP, 단 두가지 프로토콜만으로 통신이 다 될까? 당연히 그럴 리 없다.  
네트워크에 필요한 프로토콜등을 모아놓은 개념은  OSI 7 layer model과 TCP/IP모델로 크게 2가지로 나누어볼 수 있다. 

## OSI 7 layers model, TCP/IP model

OSI(Open Systems Interconnection) 7 layer model이 아래의 그림처럼 네트워크 통신 전반에 대해 정의한다면,  
TCP/IP는 인터넷에 연결된 컴퓨터끼리 데이터를 전송하는 것을 정의한다.  
즉 브라우저에 특정 도메인을 입력할 때에는 TCP/IP 모델의 모든 계층이 사용되지만 OSI 7 layers의 경우 그렇지 않다. 

<img src="https://user-images.githubusercontent.com/79896443/193521015-601738b1-667e-4cf4-9b44-f85e0eef55a3.png" width="500">

## TCP/IP model

TCP/IP는 단어 그대로는 TCP/IP이면 TCP와 IP이지만, 실제로는 IP를 사용하는 통신에서 사용하는 프로토콜의 집합으로 TCP/IP model, TCP/IP Protocol Suite등으로도 불린다. 

즉, 클라이언트부터 서버까지(브라우저-서버의 개념이 아닌, 정보를 보내는 쪽이면 클라이언트이고 받는 쪽이면 서버)  
패킷으로 데이터 분할, 주소 지정, 전송, 라우팅, 수신으로 인터넷을 통해 데이터를 교환하는 방법을 지정한다. 

클라이언트가 보내는 데이터는 아래의 그림처럼 각각의 계층을 지나오면서 캡슐화된다. 이러한 형태로 서버에 전달되고, 서버는 이 캡슐을 하나씩 풀어가면서 내부의 정보를 읽는다.  

<img src="https://user-images.githubusercontent.com/79896443/193520988-594538ba-961f-42d3-a127-a15a9494d46b.png" width="550">

<img src="https://user-images.githubusercontent.com/79896443/193521009-1295a879-88a6-4855-bc17-74079551e7b9.png" width="500">

각 계층마다 PDU(protocol data unit)을 일컫는 명칭이 다르다.  
HTTP 데이터에 TCP 헤더가 더해져 segment가 되고, 그것에 IP헤더가 더해져 packet이 되고, 그것에 클라이언트와 서버의 MAC 주소 정보를 담는 Ethernet 헤더가 더해져 frame이 된다.   
이렇게 capsulate되어 서버에 전송이 되면, 서버는 decapsulate 하며 HTTP데이터를 알아낸다.  
그런데 네트워크 계층에서는 MAC 주소라는 것이 필요하다고 한다. 이것이 무엇인지 알아보자. 

## MAC주소 

MAC 주소는 각 노드의 NIC(Network Interface Controller)에 할당된 고유 주소 즉, 하드웨어 단위에서 서로를 구별하기 위한 주소로 6byte이다. 

나의 맥북 2대의 MAC주소는 각각 38:f9:d3:##:##:##, 14:c2:13:##:##:##이다. 이는 제조사마다, 제조시기마다 다른데, [maclookup.app]([https://maclookup.app/vendors/apple-inc](https://maclookup.app/vendors/apple-inc))에서 38:f9:d3:~, 14:c2:13:~는 특정 시기부터 제조된 맥북에 부여된 번호임을 확인할 수 있다. 

TCP/IP는 IP주소를 기반으로 통신을 수행하고, IPv4와 같은 계층인 인터넷 계층의 ARP(Address Resolution Protocol)는 IP주소를 기반으로 MAC 주소를 알아낸다. (반대로, MAC주소로 IP주소를 알아내는 것은 RARP이다.)  
목적지의 IP 주소만 아는 상황에서 목적지로 ARP request를 보내고, 그에 대한 응답으로 물리 주소를 알아낸다. 그 후, 그 주소 정보를 frame 형태로 캡슐화한다.  
그러면 이제 TCP 연결은 어떻게 일어나는 것인지 알아보자. 

## TCP 

TCP(Transmission Control Protocol)로 데이터를 ‘확실하게’ 보내기 위해 사용되는 프로토콜이다.   
아래 그림과 같이 최초의 연결을 위해 3 way handshaking을, 연결 종료를 위해서는 4 way handshaking을 통해 신뢰성을 보장할 수 있다.  
즉 요청과 응답에 대한 상태를 알려주는 신호를 클라이언트와 서버 사이에 주고 받는다.

<img src="https://user-images.githubusercontent.com/79896443/193521020-654fe110-d5ab-42dc-b3fd-29ca5e6a77ec.png" width="700">

이제 TCP 연결이 완료되었다면 HTTP요청을 서버로 보낼 수 있다. 

## HTTP요청 

HTTP요청시에는 아래와 같은 HTTP 프로토콜을 준수하며 요청 메세지를 작성하고, 그에 맞는 응답을 받을 수 있다 

<img src="https://user-images.githubusercontent.com/79896443/193521026-8a827653-e047-4fb1-96d1-d7d25bfc4072.png" width="600">

아래는 MDN에 접속했을 때의 header 정보로 request url, method 등을 확인해볼 수 있다. 

<img src="https://user-images.githubusercontent.com/79896443/193521036-d6497309-9819-4cd1-9c20-86f42d9c284a.png" width="500">


그런데 내 컴퓨터의 요청을 받는 구글의 IP 주소가 단 한 개일까? 그럴리 없다. 
내가 요청한 도메인의 IP 주소 중, 나의 위치에 가장 적합한 주소를 전달해주는데에는 CDN이 관여한다. 

## CDN, GSLB 

CDN(Contents Distribution Network)은 웹 컨텐츠를 사용자 및 사용자 ISP와 가까운 곳에서 전송해서 전송 속도를 높이는 서버 네트워크이다.  
즉, CDN의 서버는 아래의 그림처럼 효율적인 캐싱을 위해 세계 곳곳에 위치한다. 

<img src="https://user-images.githubusercontent.com/79896443/193521027-11b14955-e68e-4798-9acc-df2561bfa464.png" width="600">

DNS로부터 통해 전달받은 IP 주소로 HTTP요청시, 서버의 호스팅 서버와 지리적으로 먼 곳에 있으면 왕복지연시간(RTT)이 길다.  
그래서 DNS 서버는 자사 서버의 IP 대신 CDN 도메인을 반환한다. 그리고 CDN서버의 DNS 서버는 사용자와 가장 가까이 위치한 엣지 서버의 IP를 반환해서 그 과정에서 컨텐츠를 받아온다.   
즉 내가 google.com이라는 도메인을 입력하면 구글이 바로 `142.250.207.110을` 주는 것이 아니다. 만약 그렇게 된다면 캘리포니아에 있는 사람과 나는 접속 시간에 차이가 난다.  
실제로는 DNS를 이용해 아래 그림처럼 나의 위치에 적합한 IP주소를 전달받게 되고, 그 주소에 요청을 한다. 

<img src="https://user-images.githubusercontent.com/79896443/193521031-9c944672-642c-4ccd-8bcc-45673cd783c2.png" width="700">

참고로 GSLB(Global server Load Balance)는 특정 지역에 집중되는 트래픽을 분산하는 DNS 기반의 로드 밸런싱이다.  
서버의 로드 상태를 지속적으로 모니터링(health check)해서 트래픽이 몰리지 않는 IP 주소를 전달할 수 있게 한다.


<br/>
<br/>

# 출처 

[https://learn.microsoft.com/ko-kr/troubleshoot/windows-client/networking/tcpip-addressing-and-subnetting](https://learn.microsoft.com/ko-kr/troubleshoot/windows-client/networking/tcpip-addressing-and-subnetting)  
[https://aws.amazon.com/blogs/mobile/what-happens-when-you-type-a-url-into-your-browser/#:~:text=You type a URL in,HTTP request to the server](https://aws.amazon.com/blogs/mobile/what-happens-when-you-type-a-url-into-your-browser/#:~:text=You%20type%20a%20URL%20in,HTTP%20request%20to%20the%20server)  
[https://www.researchgate.net/figure/The-logical-mapping-between-OSI-basic-reference-model-and-the-TCP-IP-stack_fig2_327483011](https://www.researchgate.net/figure/The-logical-mapping-between-OSI-basic-reference-model-and-the-TCP-IP-stack_fig2_327483011) 
[http://books.gigatux.nl/mirror/snortids/0596006616/snortids-CHP-2-SECT-2.html](http://books.gigatux.nl/mirror/snortids/0596006616/snortids-CHP-2-SECT-2.html)  
[https://techdifferences.com/difference-between-frame-and-packet.html](https://techdifferences.com/difference-between-frame-and-packet.html)   
[https://nordvpn.com/ko/blog/tcp-ip-protocol/](https://nordvpn.com/ko/blog/tcp-ip-protocol/)   
[https://www.techtarget.com/searchnetworking/definition/TCP-IP](https://www.techtarget.com/searchnetworking/definition/TCP-IP)   
[https://community.fs.com/blog/tcpip-vs-osi-whats-the-difference-between-the-two-models.html](https://community.fs.com/blog/tcpip-vs-osi-whats-the-difference-between-the-two-models.html)   
[https://support.huawei.com/enterprise/en/doc/EDOC1100058931/a1faac62/tcp](https://support.huawei.com/enterprise/en/doc/EDOC1100058931/a1faac62/tcp)   
[https://www.akamai.com/ko/our-thinking/cdn/what-is-a-cdn](https://www.akamai.com/ko/our-thinking/cdn/what-is-a-cdn)   
[https://www.cloudflare.com/ko-kr/learning/cdn/what-is-a-cdn/](https://www.cloudflare.com/ko-kr/learning/cdn/what-is-a-cdn/)   
[https://www.cloudlink.co.kr/product/intro/CDN](https://www.cloudlink.co.kr/product/intro/CDN)   
그림으로 배우는 http network basic(우에노 센, 영진닷컴)  