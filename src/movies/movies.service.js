const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(is_showing) {
      return knex("movies")
            .select("movies.*")
            .modify((queryBuilder) => {
                  if (is_showing) {
                        queryBuilder
                              .join(
                                    "movies_theaters",
                                    "movies.movie_id",
                                    "movies_theaters.movie_id"
                              )
                              .where({ "movies_theaters.is_showing": true })
                              .groupBy("movies.movie_id");
                  }
            });
}

function read(movie_id) {
      return knex("movies").select("*").where({ movie_id }).first();
}

function readTheaters(movie_id) {
      return knex("theaters")
            .join(
                  "movies_theaters",
                  "theaters.theater_id",
                  "movies_theaters.theater_id"
            )
            .select("*")
            .where("movie_id", movie_id);
}

const addCritic = mapProperties({
      critic_id: "critic.critic_id",
      preferred_name: "critic.preferred_name",
      surname: "critic.surname",
      organization_name: "critic.organization_name",
});

function readReviews(movie_id) {
      return knex("reviews as r")
            .join("critics as c", "r.critic_id", "c.critic_id")
            .select("*")
            .where("movie_id", movie_id)
            .then((data) => {
                  return Promise.all(data.map(addCritic));
            });
}

module.exports = {
      list,
      read,
      readTheaters,
      readReviews,
};
