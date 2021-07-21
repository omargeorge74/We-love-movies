const knex = require("../db/connection");

function getReview(reviewId) {
      return knex("reviews").select("*").where("review_id", reviewId).first();
}

function destroy(review_id) {
      return knex("reviews").select("*").where({ review_id }).del();
}

function update(updatedReview) {
      return knex("reviews")
            .select("*")
            .where({ review_id: updatedReview.review_id })
            .update(updatedReview, "*");
}

function criticList(criticId) {
      return knex("critics")
            .select("*")
            .where({ "critics.critic_id": criticId })
            .then((data) => data[0]);
}

module.exports = {
      getReview,
      criticList,
      update,
      delete: destroy,
};
