const {validationResult} = require("express-validator");
const IdeaDb = require("../models/ideas");

const ideas_index =  async (req, res) => {
  const querySearchStr = Object.keys(req.query).shift();
  let resData
  try {
    if (!querySearchStr) {
      resData = await IdeaDb.find().sort({createdAt: -1});
      if (resData) res.send(resData);
    } else {
      let resData = await IdeaDb.find().sort({createdAt: -1});
      const filteredData = resData.filter(item => item.name.toLowerCase().includes(req.query[querySearchStr].toLowerCase()));
      return res.send(filteredData);
    }
  } catch (error) {
    console.log(error);
  }
}


const idea_view = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  } else {
    IdeaDb.create(req.body).then(function (idea) {
      res.send(idea);
    }).catch(next);
  }
}


module.exports = {
  ideas_index,
  idea_view,
}
