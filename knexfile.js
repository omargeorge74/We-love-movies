const path = require("path");

if (process.env.USER) require("dotenv").config();

const {
      DATABASE_URL = "postgres://rihxoiyn:gZ6XjA7A4TXVn6DFaWFAAZa-ivQqQrk1@kashin.db.elephantsql.com/rihxoiyn",
} = process.env;

//"postgresql://postgres@localhost/postgres"

module.exports = {
      development: {
            client: "postgresql",
            connection: DATABASE_URL,
            pool: { min: 0, max: 5 },
            migrations: {
                  directory: path.join(__dirname, "src", "db", "migrations"),
            },
            seeds: {
                  directory: path.join(__dirname, "src", "db", "seeds"),
            },
      },

      production: {
            client: "postgresql",
            connection: DATABASE_URL,
            pool: { min: 0, max: 5 },
            migrations: {
                  directory: path.join(__dirname, "src", "db", "migrations"),
            },
            seeds: {
                  directory: path.join(__dirname, "src", "db", "seeds"),
            },
      },

      test: {
            client: "sqlite3",
            connection: {
                  filename: ":memory:",
            },
            migrations: {
                  directory: path.join(__dirname, "src", "db", "migrations"),
            },
            seeds: {
                  directory: path.join(__dirname, "src", "db", "seeds"),
            },
            useNullAsDefault: true,
      },
};
