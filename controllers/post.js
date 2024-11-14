const { Post, Hashtag } = require('../models');

// 이미지 업로드 후 URL을 반환하는 컨트롤러 함수
exports.afterUploadImage = (req, res) => {
  console.log(req.file); 
  res.json({ success: true, url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res) => {
  try {
    const post = await Post.create({
      post_nick: req.body.post_nick,
      content: req.body.content,
      img: req.body.url,      
      UserId: req.user.id,
    });

    const hashtags = req.body.content.match(/#[^\s#]*/g);

    if (hashtags) { // 해시태그가 존재하면 실행
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        }),
      );
      await post.addHashtags(result.map(r => r[0])); // 각 해시태그의 첫 번째 요소 (해시태그 인스턴스)를 연결
    }

    res.json({ success: true, post: post }); // 생성된 게시물 정보를 포함한 응답

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });

    if (!post) {
      return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
    }

    if (post.UserId !== req.user.id) {
      return res.status(403).json({ success: false, message: '작성자만 삭제할 수 있습니다.' });
    }

    await post.destroy();
    res.json({ success: true, message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });

    if (!post) {
      return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
    }

    if (post.UserId !== req.user.id) {
      return res.status(403).json({ success: false, message: '작성자만 수정할 수 있습니다.' });
    }

    await post.update({
      content: req.body.content,
      img: req.body.url,
    });

    res.json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};