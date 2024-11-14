const { User, Post, Hashtag } = require('../models'); // User, Post, Hashtag 모델을 가져옴

// 모든 게시물을 가져옴
exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: { // Post에 연결된 User 모델의 정보 포함
        model: User,
        attributes: ['id', 'nick'], // User 모델의 id와 nick만 가져옴
      },
      order: [['createdAt', 'DESC']], // 최신 게시물이 먼저 오도록 정렬
    });

    // JSON 형식으로 게시물 데이터 반환
    const twits = posts.map(post => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      user: {
        id: post.User.id,
        nick: post.User.nick,
      },
    }));

    res.status(200).json({
      success: true,
      title: 'NodeBird',
      twits: twits, // 게시물 정보를 리스트 형식으로 반환
    });
  } catch (err) {
    console.error(err); // 오류 발생 시 콘솔에 출력
    return res.status(500).json({ success: false, message: err.message }); // 오류 발생 시 JSON 형식으로 반환
  }
};

// 해시태그 검색 결과 반환
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
    const twits = posts.map(post => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      user: {
        id: post.User.id,
        nick: post.User.nick,
      },
    }));

    return res.status(200).json({
      success: true,
      title: `${query} | NodeBird`,
      twits: twits, // 게시물 정보를 리스트 형식으로 반환
    });
  } catch (error) {
    console.error(error); // 오류 발생 시 콘솔에 출력
    return res.status(500).json({ success: false, message: error.message }); // 오류 발생 시 JSON 형식으로 반환
  }
};