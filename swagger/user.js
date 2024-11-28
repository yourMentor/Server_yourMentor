/**
 * @swagger
 * tags:
 *   name: User
 *   description: 유저 관리 API
 */

/**
 * @swagger
 * /user/{id}/follow:
 *   post:
 *     summary: 유저 팔로우
 *     description: 로그인한 유저가 특정 유저를 팔로우합니다.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팔로우할 유저의 ID
 *         example: 2
 *     responses:
 *       200:
 *         description: 팔로우 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "success"
 *       404:
 *         description: 유저를 찾을 수 없음
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
 *                   example: "User not found"
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
 * /user/{id}/unfollow:
 *   delete:
 *     summary: 유저 팔로우 취소
 *     description: 로그인한 유저가 특정 유저와의 팔로우 관계를 취소합니다.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팔로우를 취소할 유저의 ID
 *         example: 2
 *     responses:
 *       200:
 *         description: 팔로우 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Unfollow successful"
 *       404:
 *         description: 유저 또는 팔로우 관계를 찾을 수 없음
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
 *                   example: "User not found"
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
 * /user/fix/{userId}:
 *   put:
 *     summary: 유저 정보 수정
 *     description: 유저의 닉네임과 비밀번호를 수정합니다.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 유저의 ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nick:
 *                 type: string
 *                 description: 새로운 닉네임
 *                 example: "newNickname"
 *               password:
 *                 type: string
 *                 description: 새로운 비밀번호
 *                 example: "newPassword123!"
 *     responses:
 *       200:
 *         description: 유저 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User information updated successfully"
 *       404:
 *         description: 유저를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating user information"
 */

/**
 * @swagger
 * /users/get/{userId}:
 *   get:
 *     summary: 특정 유저 정보 조회
 *     description: 주어진 ID를 가진 유저의 정보를 조회하며, 해당 유저가 작성한 게시글 목록도 함께 반환합니다.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 조회할 유저의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적으로 유저 정보를 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nick:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       post_nick:
 *                         type: string
 *                       content:
 *                         type: string
 *                       img:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: 유저를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: 서버 에러 발생
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */


/**
 * @swagger
 * /user/get-all:
 *   get:
 *     summary: 전체 유저 조회
 *     description: 모든 유저의 정보를 조회합니다 (비밀번호 제외).
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 전체 유저 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nick:
 *                     type: string
 *                     example: "nickname"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-01T12:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-02T12:00:00.000Z"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching all users"
 */

