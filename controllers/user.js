const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.status(200).json({ success: true, message: 'success' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};

// 유저 정보 수정 (닉네임, 비밀번호 변경 가능)
exports.updateUser = async (req, res) => {
  const { userId } = req.params; // URL에서 유저 ID 추출
  const { nick, password } = req.body; // 요청 본문에서 닉네임과 비밀번호 추출

  try {
    const user = await User.findByPk(userId); // 유저 조회
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 닉네임이 있을 경우 닉네임 수정
    if (nick) {
      user.nick = nick;
    }

    // 비밀번호가 있을 경우 비밀번호 해싱 후 수정
    if (password) {
      const saltRounds = 12; // 해싱 복잡도
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }

    await user.save(); // 변경 사항 저장
    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user information' });
  }
};

// 유저 정보 조회 (Read)
exports.getUserInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    // 유저 정보와 함께 작성한 게시글 목록 조회
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }, // 비밀번호 제외
      include: [
        {
          model: Post,
          attributes: ['id', 'post_nick', 'content', 'img', 'createdAt'], // 게시글의 필요한 필드만 선택
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
};

// 전체 유저 조회 API
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // 비밀번호 제외
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching all users' });
  }
};