const { User, Post, Hashtag } = require('../models'); // User, Post, Hashtag 모델을 가져옴

// 프로필 페이지를 렌더링하는 함수 (JSON 반환)
exports.renderProfile = (req, res) => {
  res.status(200).json({ success: true, title: '내 정보 - NodeBird' });
};

// 회원가입 페이지를 렌더링하는 함수 (JSON 반환)
exports.renderJoin = (req, res) => {
  res.status(200).json({ success: true, title: '회원가입 - NodeBird' });
};

// 메인 페이지를 렌더링하는 함수 (게시물 가져오기 후 JSON 반환)
exports.renderMain = async (req, res, next) => {
  try {
    // 모든 게시물을 가져옴
    const posts = await Post.findAll({
      include: { // Post에 연결된 User 모델의 정보 포함
        model: User,
        attributes: ['id', 'nick'], // User 모델의 id와 nick만 가져옴
      },
      order: [['createdAt', 'DESC']], // 최신 게시물이 먼저 오도록 정렬
    });

    // JSON 형식으로 게시물 데이터 반환
    res.status(200).json({
      success: true,
      title: 'NodeBird',
      twits: posts,
    });
  } catch (err) {
    console.error(err); // 오류 발생 시 콘솔에 출력
    return res.status(500).json({ success: false, message: err.message }); // 오류 발생 시 JSON 형식으로 반환
  }
};

// 해시태그 검색 결과 페이지를 렌더링하는 함수 (검색된 게시물 JSON 반환)
exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag; // 쿼리스트링에서 'hashtag' 키의 값을 가져옴
  if (!query) {
    return res.status(400).json({ success: false, message: 'Hashtag query parameter is missing' });
  }
  try {
    // Hashtag 모델에서 해당 제목을 가진 해시태그를 검색
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      // 해시태그가 존재하면 관련된 모든 게시물을 가져옴
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    // 검색된 게시물 데이터를 JSON 형식으로 반환
    return res.status(200).json({
      success: true,
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error); // 오류 발생 시 콘솔에 출력
    return res.status(500).json({ success: false, message: error.message }); // 오류 발생 시 JSON 형식으로 반환
  }
};
