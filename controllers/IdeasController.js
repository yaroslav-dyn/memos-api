const IdeaDb = require("../models/ideas");
const {validationResult} = require("express-validator");

const ideas_index =  async (req, res) => {
  const querySearchStr = Object.keys(req.query).shift();
  let resData
  try {
    if (!querySearchStr) {
      resData = await IdeaDb.find().where('userId').equals(req.user._id).sort({createdAt: -1});
      if (resData) res.send(resData);
    } else {
      let resData = await IdeaDb.find().where('userId').equals(req.user._id).sort({createdAt: -1});
      const filteredData = resData.filter(item => item.name.toLowerCase().includes(req.query[querySearchStr].toLowerCase()));
      return res.send(filteredData);
    }
  } catch (error) {
    console.log(error);
  }
}

const ideas_one = async (req, res) => {
  IdeaDb.findOne({_id: req.params.id})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
}

const idea_view = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  } else {
    IdeaDb.create({...req.body, userId: req.user._id}).then(function (idea) {
      res.send(idea);
    }).catch(next);
  }
}

const update_idea = async (req, res) => {
  IdeaDb.findOneAndUpdate({_id: req.params.id}, req.body).then(function (item) {
    res.send(item);
  });
}


const delete_idea = async (req, res) => {
  IdeaDb.findByIdAndDelete({_id: req.params.id}).then(function (item) {
    res.send(item)
  });
}


module.exports = {
  ideas_index,
  ideas_one,
  idea_view,
  update_idea,
  delete_idea
}
