// 로그인 상태 확인 미들웨어
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { // 사용자가 인증된 상태인지 확인
    next(); // 인증된 사용자라면, 다음 미들웨어나 라우터로 진행
  } else {
    res.status(403).send('로그인 필요'); // 인증되지 않은 사용자라면 403 상태 코드와 함께 "로그인 필요" 메시지 전송
  }
};

// 로그인하지 않은 상태 확인 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) { // 사용자가 인증되지 않은 상태인지 확인
    next(); // 인증되지 않은 사용자라면, 다음 미들웨어나 라우터로 진행
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.'); // 로그인한 상태로 접근한 경우 메시지 인코딩
    res.redirect(`/?error=${message}`); // 로그인한 상태로 접근할 수 없으므로, 에러 메시지를 포함한 메인 페이지로 리다이렉트
  }
};
