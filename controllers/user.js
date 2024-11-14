const User = require('../models/user'); // User 모델을 불러옴

// 사용자가 다른 사용자를 팔로우하는 컨트롤러 함수
exports.follow = async (req, res, next) => {
  try {
    // 현재 로그인한 사용자를 조회 (id 값은 req.user.id에서 가져옴)
    const user = await User.findOne({ where: { id: req.user.id } });
    
    if (user) { // 사용자 정보가 존재하면 팔로우 처리
      // addFollowing 메서드를 사용해 팔로우 관계를 추가
      // req.user.id는 팔로워(follower) ID로, req.params.id는 팔로잉(following) ID로 사용
      await user.addFollowing(parseInt(req.params.id, 10)); // URL의 id 값을 정수로 변환해 전달
      // 성공 시 JSON 형식으로 응답 반환
      res.status(200).json({ success: true, message: 'success' });
    } else {
      // 사용자 정보가 없으면 404 상태와 메시지를 JSON 형식으로 반환
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) { // 에러 발생 시
    console.error(error); // 에러를 콘솔에 출력
    // 에러 발생 시 500 상태와 함께 오류 메시지를 JSON 형식으로 반환
    res.status(500).json({ success: false, message: error.message });
    next(error); // 에러를 다음 미들웨어에 전달
  }
};
