const express = require('express'); // Express 모듈
const cookieParser = require('cookie-parser'); // 쿠키 파싱 미들웨어
const morgan = require('morgan'); // HTTP 요청 로깅 미들웨어
const path = require('path'); // 파일 및 디렉토리 경로 처리
const session = require('express-session'); // 세션 관리 미들웨어
const nunjucks = require('nunjucks'); // 템플릿 엔진
const dotenv = require('dotenv'); // 환경변수 관리
const passport = require('passport'); // 인증 미들웨어

dotenv.config(); // .env 파일의 환경 변수를 불러오기
const pageRouter = require('./routes/page'); // 페이지 관련 라우터
const authRouter = require('./routes/auth'); // 인증 관련 라우터
const postRouter = require('./routes/post'); // 게시글 관련 라우터
const userRouter = require('./routes/user'); // 사용자 관련 라우터
const { sequelize } = require('./models'); // Sequelize ORM 설정
const passportConfig = require('./passport'); // Passport 설정

const app = express();
passportConfig(); // Passport 설정 초기화

app.set('port', process.env.PORT || 8001); // 서버 포트 설정, 환경변수 PORT를 사용하고 없으면 8001번 포트
app.set('view engine', 'html'); // 템플릿 엔진 설정
nunjucks.configure('views', {
  express: app,
  watch: true, // nunjucks의 설정으로, view 파일 변경 시 자동 반영
});

sequelize.sync({ force: false }) // 데이터베이스와 동기화
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev')); // HTTP 요청을 'dev' 형식으로 로깅
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공, /public 폴더를 루트 경로로 설정
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // 업로드된 이미지 파일 제공
app.use(express.json()); // JSON 형식의 요청 본문을 해석
app.use(express.urlencoded({ extended: false })); // URL-encoded 요청 본문을 해석

app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 암호화에 환경 변수 사용
app.use(session({
  resave: false, // 세션을 항상 저장할지 여부 (권장 설정)
  saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
  secret: process.env.COOKIE_SECRET, // 세션 암호화 키
  cookie: {
    httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 설정
    secure: false, // HTTPS에서만 쿠키를 전송하는 옵션 (false는 HTTP도 허용)
  },
}));
app.use(passport.initialize()); // Passport 초기화
app.use(passport.session()); // Passport 세션 연결

// 라우터 연결
app.use('/', pageRouter); // 페이지 관련 라우터
app.use('/auth', authRouter); // 인증 관련 라우터
app.use('/post', postRouter); // 게시글 관련 라우터
app.use('/user', userRouter); // 사용자 관련 라우터

// 404 에러 처리
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message; // 에러 메시지 설정
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 에러 상세 정보 설정 (개발 환경에서만 노출)
  res.status(err.status || 500); // 에러 상태 설정 (500은 서버 에러)
  res.render('error'); // error 템플릿 렌더링
});

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
