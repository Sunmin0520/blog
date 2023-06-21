---
title: '[Python] g2pk를 이용해 외국어를 한글 발음으로 나타내기'
date: 2023-06-21 23:53:07
category: 'python'
draft: false
---
업무상 g2pk를 이용해 input text에 대해 output을 확인할 일이 있었다.    
g2pk에서 사용하는 모듈은 mecab 관련 패키지의 설치가 꽤 까다로운 점이 있었지만,  
이 과정에서 가상환경을 통한 버전의 관리가 중요하다는 것을 확실히 배운 소중한 경험이었다.  
또한 어느 부분이 문제이기 찾아내기 전까지는 사용자 권한, permission error 등을 확인하면서도 많이 배웠다.  
한편 한글 사용을 위한 패키지이니 참고할 수 있는 자료가 한글로 된 문서만 존재하는 것도 색다른 경험이었고,  
이미 공개된지 수 년이 지났다보니 현재의 Mac OS 버전 때문에 충돌이 나는건지 혹은 그 외의 이유인지를 알아내는 것이 조금 어려웠다.
 
g2pk를 사용하기 위해서는 https://github.com/Kyubyong/g2pK#requirements 에 명시된 것처럼    
버전 3.6이상의 python >= 3.6, jamo, python-mecab-ko, konlpy, nltk가 필요하다.   
이 중 `pip install <패키지명>` 으로 바로 설치가 가능한  jamo, konlpy, nltk와 달리,  
mecab과 관련된 요소들은 각각은 설치가 되었으나 동작시키면 에러가 발생해서 해결에 시간이 많이 소요되었다.    

원인은 파이썬 버전 정보가 꼬여서였다.   
이전에 잘 모르고 가상환경 없이 이용한 어플리케이션도 많았고,  
가상환경을 써도 실행시에 특정 패키지가 module not found가 나와서  
`$ python -m pip install <패키지명>` 을 추가해서 설치한 경우도 잦았다.    
그 결과 `$ python —version` 을 입력하면 `3.9.6`이 나오는데   
새로 설치한 패키지는 `/usr/local/lib/python3.11/site-packages`에 있고,   
`python -m`을 추가하여 설치한 패키지는 `/usr/local/lib/python3.9/site-packages`에 있는 지저분한 경우들을 발견할 수 있었다.     
환경설정부터 ./g2pk/english.py의 사용까지의 과정은 아래와 같다.  
사용 환경은 **Mac OS Ventura 13.4**이다. 
 
## Python version 정리 
1. Python 3.11.4를 https://www.python.org/downloads/에서 다운로드 후 설치했다.    
    - 이유: 그동안의 여러 어플리케이션에서 여러 버전의 파이썬을 사용했지만 반드시 특정 버전을 사용해야하는 경우는 없었다.  
    그래서 이번 기회에 버전을 명시적으로 전역적으로 3.11.4를 사용하고자 했다.  
2. 기존에 alias를 `python=/usr/bin/python3`로 사용하고 있었는데 이것을 `python=python3`로 변경 했다.  
    - 이유: `/usr/bin/python3` 는 명시적인 Python 3 인터프리터를 가리키므로 파이썬 특정 버전을 사용하기에 적합하고,  
    `python3`는 기본 Python 3 인터프리터를 실행하기에 파이썬 버전에 구애받지 않고 사용하기에 좋다.  
    따라서 내가 사용하려는 방향에 더 적합하게 alias를 변경했다. 
 
## Cloning g2pk 
`$ git clone https://github.com/Kyubyong/g2pK.git`    
 
## 가상환경 설정 
파이썬은 시스템 전역에 설치된 패키지들을 공유한다. 따라서 어플리케이션마다의 독립적인 버전 관리를 위해서는 가상환경의 설정이 필요하다.   

1. clone한 g2pk 내부에서 가상환경 생성 `$ python -m venv venv`   
2. 생성한 가상환경의 활성화 `$ source venv/bin/activate`  

활성화 이후로는 계속 가상환경 내부에서 작업했다.

## jamo, nltk, konlpy, python-mecab-ko 설치 
root 위치에서 `$ pip install -e .`로 필요한 패키지들을 설치할 수 있다.  
./setup.py의 setuptools.setup의 install_requires에 정의된 패키지인 jamo, nltk, konlpy, python-mecab-ko가 설치된다.  
사실 setuptools를 잘 모르고 처음에는 requirements.txt를 아래처럼 작성 후 `$ pip install -r requirements.txt`로 설치했었는데 결과물은 같다.
```json 
jamo 
nltk 
konlpy 
python-mecab-ko 
``` 
python-mecab-ko는 mecab-ko의 파이썬 바인딩을 위한 패키지이며, mecab-ko는 별도로 설치해야한다. 

## mecab-ko 설치 
mecab은 범용 형태소 분석기 엔진이다.    
(프로젝트 전체의 마인드맵https://mind42.com/mindmap/b269c84a-3975-48ef-946e-8900f3414661?rel=url 도 있는데 멋있다!!)  
설치는 파일 다운로드 후 → 압축 풀기 → INSTALL 문서에 제시된 순서대로 아래처럼 진행했다. 

`$ wget https://bitbucket.org/eunjeon/mecab-ko/downloads/mecab-0.996-ko-0.9.2.tar.gz`  
`$ tar xvfz mecab-0.996-ko-0.9.2.tar.gz>> cd mecab-0.996-ko-0.9.2`    
`$ ./configure`   
`$ make`   
`$ make check`   
`$ sudo make install`   

## mecab-ko-dic 설치 
mecab-ko-dic은 mecab-ko를 사용하는 한국어 형태소 사전으로 추가적인 커스터마이징이 가능하다.  
설치는 아래 순서처럼 진행했다.  

`$ wget https://bitbucket.org/eunjeon/mecab-ko-dic/downloads/mecab-ko-dic-2.1.1-20180720.tar.gz`  
`$ tar xvfz mecab-ko-dic-2.1.1-20180720.tar.gz`  
`$ cd mecab-ko-dic-2.1.1-20180720`   
`$ autoreconf`  
`$ ./configure`  
`$ make`    
`$ sudo make install`  
참고로 autoreconf 없이 압축해제 → ./configure → make의 순서로 진행하면 아래와 같은 에러가 발생했다.   
autoreconf는 configure스크립트와 Makefile을 생성 또는 업데이트하는 작업을 수행한다고 한다. 
```
  CDPATH="${ZSH_VERSION+.}:" && cd . && /bin/sh <경로>/mecab-0.996-ko-0.9.2/mecab-ko-dic-2.1.1-20180720/missing --run aclocal-1.11 
  <경로>/mecab-0.996-ko-0.9.2/mecab-ko-dic-2.1.1-20180720/missing: line 52: aclocal-1.11: command not found 
  WARNING: `aclocal-1.11' is missing on your system.  You should only need it if you modified` acinclude.m4' or `configure.ac'.  You might want  to install the` Automake' and `Perl' packages.  Grab them from any GNU archive site. cd . && /bin/sh <경로>/mecab-0.996-ko-0.9.2/mecab-ko-dic-2.1.1-20180720/missing --run automake-1.11 --gnu <경로>/mecab-0.996-ko-0.9.2/mecab-ko-dic-2.1.1-20180720/missing: line 52: automake-1.11: command not found WARNING:` automake-1.11' is missing on your system.  You should only need it if 
  you modified `Makefile.am',` acinclude.m4' or `configure.ac'.          You might want to install the` Automake' and `Perl' packages. 
  Grab them from any GNU archive site. 
  CDPATH="${ZSH_VERSION+.}:" && cd . && /bin/sh <경로>/mecab-0.996-ko-0.9.2/mecab-ko-dic-2.1.1-20180720/missing --run autoconf 
  [configure.ac:56](http://configure.ac:56/): warning: AC_OUTPUT should be used without arguments. 
  [configure.ac:56](http://configure.ac:56/): You should run autoupdate. 
  [configure.ac:2](http://configure.ac:2/): error: possibly undefined macro: AM_INIT_AUTOMAKE 
  If this token and others are legitimate, please use m4_pattern_allow. 
  See the Autoconf documentation. 
  make: *** [configure] Error 1 
```
 그래서 혹시 모를 가능성을 제거하고자 `$ make`에서 에러가 났을 때의 기존 파일을 삭제 후 다시 다운로드 받아 위의 순서대로 $ autoreconf 를 추가해서 진행했다. 
 
## mecab-python-0.996 설치 
mecab-python-0.996은 MeCab에서 제공하는 python 바인딩 소스가 Python 3.x에서 문제를 일으키는 것을 개선한 것이라고 한다.    
아래의 순서대로 진행했다. 

`$ git clone https://bitbucket.org/eunjeon/mecab-python-0.996.git`  
`$ cd mecab-python-0.996`  
`$ python setup.py build`  
`$ python setup.py install`  
참고로 위의 4개의 과정 없이 `$ pip install mecab-python3`로의 설치도 시도해보았는데 이것은 완료 후에 실행시 mecab 모듈을 확인할 수 없다고 나와서 삭제했다. 


## 설치 여부 확인 
위의 과정을 거쳐 설치를 완료하면 파일의 구성은 아래와 같다. 

``` 
📦g2pK 
 ┣ 📂g2pK.egg-info 
 ┣ 📂g2pk 
 ┃ ┣ 📜__init__.py 
 ┃ ┣ 📜english.py 
 ┃ ┣ 📜g2pk.py 
 ┃ ┣ 📜idioms.txt 
 ┃ ┣ 📜numerals.py 
 ┃ ┣ 📜regular.py 
 ┃ ┣ 📜rules.txt 
 ┃ ┣ 📜special.py 
 ┃ ┣ 📜table.csv 
 ┃ ┣ 📜tempCodeRunnerFile.py 
 ┃ ┣ 📜test.py # 테스트를 위해 별도로 만든 파일
 ┃ ┗ 📜utils.py 
 ┣ 📂mecab-0.996-ko-0.9.2 
 ┣ 📂mecab-ko-dic-2.1.1-20180720 
 ┣ 📂mecab-python-0.996 
 ┣ 📂venv 
 ┣ 📜.gitignore 
 ┣ 📜LICENSE 
 ┣ 📜MANIFEST.in 
 ┣ 📜README.md 
 ┣ 📜mecab-0.996-ko-0.9.2.tar.gz 
 ┣ 📜mecab-ko-dic-2.1.1-20180720.tar.gz 
 ┣ 📜requirements.txt 
 ┣ 📜setup.py 
``` 
설치 여부의 확인을 위해  
`$ mecab —version`   
`$ mecab -d /usr/local/lib/mecab/dic/mecab-ko-dic`을 입력해 아래와 같이 결과가 나오는 것을 확인할 수 있다. 

<img src="https://github.com/Sunmin0520/blog/assets/60782131/4fc25c54-b189-448f-9d6f-aef8aa119e18" width=500>

아래의 구성 중 하나로도 확인이 가능하다.  
1번의 경우 실행시 ['안녕', '하', '세요']가 나오고,  
2번의 경우 `mecab -d /usr/local/lib/mecab/dic/mecab-ko-dic` 를 실행했을 때와 같은 결과가 나옴을 확인할 수 있다. 
```json 
#1 
from konlpy.tag import Mecab 
tokenizer = Mecab() 
print(tokenizer.morphs('안녕하세요')) 

#2 
import MeCab 
m = MeCab.Tagger() 
print(m.parse('안녕하세요') ) 
``` 

## 실행 결과

<img src="https://github.com/Sunmin0520/blog/assets/60782131/92714c7f-a72e-4065-94fe-d80cd613b749" width=500>


## 기타
- https://konlpy.org/en/latest/install 에는 ‘Install MeCab’의 목적으로 `$ bash <(curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)` 를 입력하여 스크립트 파일을 실행하는 것이 나와있다. 
mecab이 이미 설치되어있었지만, 실행해보았는데 setuptools.extern.packaging.version.InvalidVersion: Invalid version: '0.996-ko-0.9.2’이라고 에러가 나오며 설치가 되지 않았다.    
이 에러에 대한 원인은 찾지 못했다.  
<img src="https://github.com/Sunmin0520/blog/assets/60782131/6e4d676b-a639-4e56-ab23-4a0e03dc749d" width=500>
<img src="https://github.com/Sunmin0520/blog/assets/60782131/15ff8c87-7991-4665-ad34-49059d3841d7" width=500>

- utils.py에서 정의한 함수들을 english.py에서 불러오지 못하는 이슈가 있어서 이 부분은 빠른 해결을 위해 english.py에서 필요한 utils.py의 함수를 english.py에 바로 붙여넣어 사용했다. 

## 참고 
- 각 패키지별 github repository
- https://lovablebaby1015.wordpress.com/2018/09/24/mecab-macos-%EC%84%A4%EC%B9%98-%EC%82%BD%EC%A7%88-%ED%9B%84%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91/   
- https://mondayus.tistory.com/46 