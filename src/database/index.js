/* eslint-disable class-methods-use-this */
import data from "./data";
import log from "../logger";

class DatabaseConnection {
  constructor(server) {
    this.server = server;
    this.data = data[this.server].map(el => {
      el.positions = [];
      const positions = data.positions.forEach(position => {
        if (position.portfolioId === el.id) {
          el.positions.push(position);
        }
      });
      return el;
    });
  }

  // noinspection JSUnusedGlobalSymbols
  // noinspection JSMethodCanBeStatic
  /**
   * Loads all data.
   * @returns {Promise<{portfolios, positions}>}
   */
  load() {
    log.info("Database: load");

    return Promise.resolve(data);
  }

  get(id) {
    if (id) {
      const filteredData = this.data.find(el => el.id === id);
      return Promise.resolve(filteredData);
    }
    return Promise.resolve(this.data);
  }

  getBy(currencyType) {
    const matchingData = this.data
      .map(el => {
        el.positions = el.positions.filter(
          position => position.currency === currencyType
        );
        return el;
      })
      .filter(el => el.positions.length > 0);
    return Promise.resolve(matchingData);
  }
}

/**
 * A mock database client that simulates getting data from a database and a slow initial connection.
 */
class DatabaseClient {
  connect(server) {
    return new Promise((resolve, reject) => {
      if (server === null) {
        reject(new Error("No server specified"));
      }
      setTimeout(() => {
        log.info("Database: connected");
        resolve(new DatabaseConnection(server));
      }, 2000);
    });
  }
}

export default new DatabaseClient();
