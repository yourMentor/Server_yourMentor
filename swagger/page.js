/**
 * @swagger
 * tags:
 *   name: Page
 *   description: 게시물 및 해시태그 검색 관련 API
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: 모든 게시물 조회
 *     description: 등록된 모든 게시물을 최신순으로 조회합니다.
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: 게시물 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 title:
 *                   type: string
 *                   example: "NodeBird"
 *                 twits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 게시물 ID
 *                         example: 1
 *                       content:
 *                         type: string
 *                         description: 게시물 내용
 *                         example: "안녕하세요. 첫 번째 게시물입니다!"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 게시물 작성 시간
 *                         example: "2024-11-18T12:34:56.000Z"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: 작성자 ID
 *                             example: 2
 *                           nick:
 *                             type: string
 *                             description: 작성자 닉네임
 *                             example: "작성자닉네임"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */


/**
 * @swagger
 * /page/{id}:
 *   get:
 *     summary: "게시물 단일 조회"
 *     description: "게시물과 해당 게시물의 댓글들을 조회합니다."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "조회할 게시물의 ID"
 *         schema:
 *           type: integer
 *     tags: [Page]  # 페이지 태그를 추가했습니다.
 *     responses:
 *       200:
 *         description: "게시물과 댓글이 성공적으로 조회됨"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "게시물 내용"
 *                     img:
 *                       type: string
 *                       example: "image_url"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-26T10:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-26T10:10:00Z"
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nick:
 *                           type: string
 *                           example: "user_nick"
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           content:
 *                             type: string
 *                             example: "댓글 내용"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-11-26T10:15:00Z"
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 2
 *                               nick:
 *                                 type: string
 *                                 example: "comment_user"
 *       404:
 *         description: "게시물이 존재하지 않음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Post not found"
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch post"
 */


/**
 * @swagger
 * /page/hashtag:
 *   get:
 *     summary: 해시태그 검색
 *     description: 특정 해시태그와 관련된 게시물을 검색합니다.
 *     tags: [Page]
 *     parameters:
 *       - in: query
 *         name: hashtag
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색할 해시태그
 *         example: "NodeJS"
 *     responses:
 *       200:
 *         description: 해시태그 검색 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 title:
 *                   type: string
 *                   example: "NodeJS | NodeBird"
 *                 twits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 게시물 ID
 *                         example: 1
 *                       content:
 *                         type: string
 *                         description: 게시물 내용
 *                         example: "해시태그 검색과 관련된 게시물입니다."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 게시물 작성 시간
 *                         example: "2024-11-18T12:34:56.000Z"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: 작성자 ID
 *                             example: 2
 *                           nick:
 *                             type: string
 *                             description: 작성자 닉네임
 *                             example: "작성자닉네임"
 *       400:
 *         description: 해시태그 파라미터 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Hashtag query parameter is missing"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
