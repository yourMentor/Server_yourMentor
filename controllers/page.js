const { User, Post, Hashtag } = require('../models');

// 내 프로필 조회 API
exports.renderProfile = (req, res) => {
  res.json({
    status: 200,
    message: '내 정보 조회 성공',
    data: {
      title: '내 정보 - NodeBird',
    },
  });
};

// 회원가입 페이지 조회 API
exports.renderJoin = (req, res) => {
  res.json({
    status: 200,
    message: '회원가입 페이지 조회 성공',
    data: {
      title: '회원가입 - NodeBird',
    },
  });
};

// 메인 페이지 게시물 조회 API
exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.json({
      status: 200,
      message: '메인 페이지 게시물 조회 성공',
      data: {
        title: 'NodeBird',
        twits: posts,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// 해시태그로 게시물 검색 API
exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.json({
      status: 400,
      message: '해시태그가 제공되지 않았습니다.',
    });
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    res.json({
      status: 200,
      message: `${query} 해시태그 검색 성공`,
      data: {
        title: `${query} | NodeBird`,
        twits: posts,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
