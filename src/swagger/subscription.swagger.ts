/**
 * @openapi
 * /subscriptions:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get all subscriptions
 *     description: Returns a paginated list of subscriptions.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (starts from 1)
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of subscriptions per page
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *           example: 10
 *     responses:
 *       200:
 *         description: List of subscriptions returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized.
 */

/**
 * @openapi
 * /subscriptions:
 *   post:
 *     tags:
 *       - Subscriptions
 *     summary: Create a subscription
 *     description: Creates a new subscription for the authenticated user.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubscriptionRequest'
 *           example:
 *             userId: "6a6ba24a6e2b980da9bb0516"
 *             planName: "premium"
 *             status: "active"
 *             startDate: "2026-07-30"
 *     responses:
 *       201:
 *         description: Subscription created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       409:
 *         description: User already has a subscription.
 */

/**
 * @openapi
 * /subscriptions/{id}:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get subscription by ID
 *     description: Returns the details of a subscription.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subscription ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Subscription not found.
 */

/**
 * @openapi
 * /subscriptions/{id}:
 *   patch:
 *     tags:
 *       - Subscriptions
 *     summary: Update subscription status
 *     description: Updates the status of an existing subscription.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subscription ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubscriptionRequest'
 *           example:
 *             status: active
 *     responses:
 *       200:
 *         description: Subscription updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Subscription not found.
 */
