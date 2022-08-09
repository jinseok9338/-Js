# 웹 개발 트랙 - JS (고급) 3주차

MongoDB 를 이용한 온라인 메모장 구현

온라인 메모장을 구현해 보았다.

1. typescript 를 이용한 es2016 문법 사용 및 타입 체크
2. Jade 가 아닌 html 을 템플렛으로 사용
3. Promise 를 이용한 비동기 기능 추가.
4. eslint 로 코드의 난무성 베재
5. husky 로 github 에 올리기전 lint 해주기
6. jest 코드 테스트 라이브러리 추가
7. docker 로 프로젝트의 배포 용이 및 데이터 베이스(특히 redis) 통합 유리

개선점..??

1. 자바 스크립트로만 코드를 작성 하면 코드베이스가 커짐에 따라서 복잡성이 커진다. 이를 방지학기 위해서 타입 스크립트로 작성 하였다. 아마 바닐라 자바 스크립트로만 코드를 작성하는 일은 없을 것이고 타입스크립트가 훨씬더 현업에 가깝다고 생각한다.

2. 강의에 나와 있는 변수 var 를 모두 let 이나 const 로 바꾸어 주었다. let 은 변할수 있는 변수, const 는 변하지 않는 변수를 나타낼때 서주는데 이는 var 는 호이스팅 이 되어 글로벌 변수가 되기 때문에 블록 스코프 인 let 과 const 로 바꾸어 주었다.

3. /write api 부분에 comments 를 만들어 주는 부분이 있다. 사실 이부분을 왜 만든것인지 모르겠지만 이는 위험한 행동이라 생각한다. 원문에서는 비어있는
   memoModel을 만든 후에 memoModel 에 하나 하나 넣어주는 형식 (아래 참조)

```
  var memo = new memoModel();
  memo.author = author
  memo.contents = contents
  memo.date = date
  memo.comments = []

```

으로 작성 되었는데 비어있는 객체를 만든후에 아이템을 넣는것보다 처음 부터 객체를 만들떄 넣는것이 바람직하다고 생각한다. 또한 원래 코드에서는 memoModel 스키마 에는 comments 가 없는데 위에 comments 를 넣어 주는 부분은 이해가 안된다. comments 가 다른 코드에서 쓰이는 것도 아니다. 이는 자바스크립트에서만 허락되는 부분이고 나중에 버그를 낳을수 있는 경우도 생기기 때문에 아래와 같이 스키마에 comments 를 넣어주고 memo 를 만들때 안에 들어가는 item 도 같이 정의 해 주었다.

```
export interface IMemo {
  author: string;
  contents: string;
  date: Date;
  comments: string[];
}

export const Memo = new Schema<IMemo>({
  author: { type: String, required: true },
  contents: String,
  date: Date,
  comments: [String],
});

 let memo = new memoModel({
    author: author,
    contents: contents,
    date: date,
    comments: [],
  });

```

4./update api 를 하나의 모델을 id 로 찾아서 찾은 객체의 contents 를 수정하는 방식으로 코드가 짜여져 있다.

```
router.post('/modify', function(req, res, next) {
	var _id = req.body._id;
	var contents = req.body.contents;

	memoModel.findOne({_id: _id}, function(err, memo) {
		if(err) {
			throw err;
		}
		else {
			memo.contents = contents;

			memo.save(function (err) {
				if (err) {
					throw err;
				}
				else {
					res.json({status: "SUCCESS"});
				}
			});
		}
	});
});

```

위의 코드의 문제점은 크게 2가지 이다. 첫째는 findOne 으로 찾은 memo 의 타입이 분명하지가 않다. 우리는 단순히 memoModel 일거라 유추 하지만 memo 의 타입을 우리가 알 수가 없다. 임의로 memo 스키마를 타입으로 쓸수도 있지만 memo 스키마를 타입으로 썼을떄 save 메소드가 존재하지 않는다는 오류가 발생한다.

두번째는 위에서 언급한 것과 같이 memo 의 contents 를 직접적으로 바꾸는것은 바람직 하지 않다. 또한 우리가 직접 아이디를 찾고 그것을 다시 save 해주는 것은 보는데도 간결하지가 않다.

그러므로 mongoose api 가 제공하는 updateOne 을 쓰거나 updateMany 를 사용하여 memo를 업데이트 하는것이 바람직하다 코드도 더욱 간결해 졌다.

```
router.post("/modify", async function (req, res, next) {
  let _id = req.body._id;
  let contents = req.body.contents;

  await memoModel.updateOne({ _id: _id }, { contents: contents })
  res.json({ status: "SUCCESS" });
});

```
