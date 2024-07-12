const data = require("../data/data.js");
const rounds = data.rounds;

const getAll = (_req, res) => {
  res.json({ data: rounds });
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const round = rounds.find((round) => round.id === Number(id));
  if (!round) {
    res
      .status(404)
      .json({ error: { message: `Round with id ${id} not found` } });
    return;
  }
  res.json({ data: round });
};

const create = (req, res) => {
  const id = Date.now();
  const { course, username, scores } = req.body;
  if (!scores || scores.length !== 18) {
    res.status(400).json({
      error: { message: "Invalid scores length." },
    });
    return;
  }
  if (!course || !username || !scores) {
    res.status(400).json({
      error: {
        message: "Invalid input",
      },
    });
    return;
  }

  const round = { id, course, username, scores };
  rounds.push(round);
  res.status(201).json({ data: round });
};

const replace = (req, res) => {
  const id = parseInt(req.params.id);
  const roundsIndex = rounds.findIndex((round) => round.id === id);

  const { course, username, scores } = req.body;

  if (!scores || scores.length !== 18) {
    res.status(400).json({
      error: { message: "Invalid scores length." },
    });
    return;
  }

  if (!course || !username || !scores) {
    res.status(400).json({
      error: {
        message: "Invalid input",
      },
    });
    return;
  }
  const newRound = { id, course, username, scores };
  rounds[roundsIndex] = newRound;
  res.json({ data: newRound });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const roundsIndex = rounds.findIndex((round) => round.id === id);
  if (roundsIndex < 0) {
    res
      .status(404)
      .json({ error: { message: `Round with id ${id} not found` } });
    return;
  }

  const { scores } = req.body;
  if (scores && scores.length !== 18) {
    res.status(400).json({
      error: { message: "Invalid scores length." },
    });
    return;
  }

  const { id: _id, ...theRest } = req.body;
  const updatedRound = { ...rounds[roundsIndex], ...theRest };
  rounds[roundsIndex] = updatedRound;
  res.send({ data: updatedRound });
};

const deleteOne = (req, res) => {
  const id = parseInt(req.params.id);
  const roundsIndex = rounds.findIndex((round) => round.id === id);
  if (roundsIndex < 0) {
    res
      .status(404)
      .json({ error: { message: `Round with id ${id} not found` } });
    return;
  }

  const deletedRound = rounds[roundsIndex];
  rounds.splice(roundsIndex, 1);
  res.send({ data: deletedRound });
};

module.exports = { getAll, getOne, create, replace, update, deleteOne };
