const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { read } = require("../movies/movies.controller");

async function list(req, res, next) {
      const theaters = await service.list();
      for (let theater of theaters) {
            const movieList = await service.addMovies(theater.theater_id);
            theater["movies"] = movieList;
      }
      res.json({ data: theaters });
}

module.exports = {
      list: [asyncErrorBoundary(list)],
};
