import log from "../logger";
import db from "../database";

export default app => {
  app.get("/", (req, res) => {
    log.info("/ called");
    res.json({ message: "You Made it!" });
  });
  app.get("/portfolios", async (req, res) => {
    const DB = await db.connect("portfolios");
    const response = await DB.get();
    res.json({ response });
  });

  app.get("/portfolios/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const DB = await db.connect("portfolios");
    const response = await DB.get(id);
    res.json({ response });
  });
  app.get("/portfolios/currency/:currency", async (req, res) => {
    const currency = req.params.currency.toUpperCase();
    const DB = await db.connect("portfolios");
    const response = await DB.getBy(currency);
    res.json({ response });
  });
};
