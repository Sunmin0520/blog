---
title: '[Node.js] __dirname, path.join'
date: 2021-03-04 10:30:07
category: 'node.js'
draft: false
---
<p>

## __dirname

- 파일에 _filename, _dirname을 넣어두면 **실행을 할 때의 파일명과 경로로 바뀌어서** 나타난다. 즉 절대경로를 알려주는 환경변수.
  
<br />
<img src = "https://user-images.githubusercontent.com/60782131/109975077-961ea580-7d3d-11eb-9bb4-57be20a4a92d.png">

## path.join([path])

- path.join 을 사용해서 인자들끼리 이어준다.
  - path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');  //'/foo/bar/baz/asdf'
  - path.join('foo', {}, 'bar'); //Throws 'TypeError: Path must be a string. Received {}'
  - **path.join(__dirname, "/test1")** 이런 식으로 붙임

<br />

**출처**
- [__dirname](https://nodejs.org/docs/latest/api/modules.html#modules_dirname)
- [path.join](https://nodejs.org/api/path.html#path_path_join_paths)


</p>
