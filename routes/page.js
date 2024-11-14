const express = require('express');
const {
  renderHashtag, renderMain
} = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
  next();
});

// GET /page
router.get('/', renderMain);

// GET /page/hashtag
router.get('/hashtag', renderHashtag);

module.exports = router;
