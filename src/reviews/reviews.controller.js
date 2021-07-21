const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
      const { reviewId } = req.params;
      const review = await service.getReview(reviewId);
      if (review) {
            res.locals.review = review;
            return next();
      }
      next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(req, res, next) {
      const { review_id } = res.locals.review;
      const data = await service.delete(review_id);
      res.sendStatus(204);
}

async function update(req, res) {
      reviewId = res.locals.review.review_id;
      const updatedReview = {
            ...res.locals.review,
            ...req.body.data,
            review_id: reviewId,
      };
      await service.update(updatedReview);
      updatedReview.critic = await service.criticList(updatedReview.critic_id);

      res.json({ data: updatedReview });
}

module.exports = {
      delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
      update: [asyncErrorBoundary(reviewExists), update],
};
