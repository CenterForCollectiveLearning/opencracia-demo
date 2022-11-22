const {DATABASE_URL} = process.env;
const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: DATABASE_URL
});

export default async function handler(req, res) {
  const p1 = [];
  const p2 = [];
  const p3 = [];

  return res.status(200).json({
    "-1": p1,
    0: p2,
    1: p3,
    panelA: p1.length + p2.length + p3.length,
    panelB: 0,
    rank: []
  });

}
  