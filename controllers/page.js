const { User, Post, Hashtag } = require('../models'); // User, Post, Hashtag 모델을 가져옴

// 모든 게시물을 가져옴
exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'], // 필요한 속성만 가져옴
      },
      order: [['createdAt', 'DESC']], // 최신 게시물 순으로 정렬
    });

    // 게시물 데이터를 매핑
    const twits = posts.map(({ id, content, createdAt, User: { id: userId, nick } }) => ({
      id,
      content,
      createdAt,
      user: {
        id: userId,
        nick,
      },
    }));

    // 성공 응답
    res.status(200).json({
      success: true,
      title: 'NodeBird',
      twits,
    });
  } catch (err) {
    console.error('Error fetching posts:', err.message); // 에러 로그 개선
    next(err); // 에러 미들웨어로 전달
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

exports.getPostById = async (req, res, next) => {
  const { postId } = req.params; // URL에서 postId를 추출

  try {
    // 특정 ID에 해당하는 게시물 조회
    const post = await Post.findOne({
      where: { id: postId }, // 조건: ID가 postId인 게시물
      include: [
        {
          model: User, // User 정보를 포함
          attributes: ['id', 'nick'], // User 모델의 id와 nick 필드만 가져옴
        },
      ],
    });

    if (!post) {
      // 게시물이 없으면 404 상태와 함께 에러 메시지 반환
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // 조회된 게시물 정보를 JSON 형식으로 반환
    return res.status(200).json({
      success: true,
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        user: {
          id: post.User.id,
          nick: post.User.nick,
        },
      },
    });
  } catch (error) {
    console.error(error); // 오류 발생 시 콘솔에 출력
    return res.status(500).json({ success: false, message: error.message }); // 오류 발생 시 JSON 형식으로 반환
  }
};
