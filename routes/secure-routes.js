const express = require("express");
const NotesController = require("../controllers/NotesController");
const ideasController = require("../controllers/IdeasController");
const ProfileController = require("../controllers/ProfileController");
const GroupController = require("../controllers/GroupController");
const AccountsController = require("../controllers/AccountsController");
const EnergyControlsController = require("../controllers/EnergyControlsController");
const {check} = require("express-validator");
const NotifDb = require("../models/notif");
const GroupsDb = require("../models/groups");
const AccountsDb = require("../models/accounts");
const EnergyControlsDb = require("../models/energyControls");
const router = express.Router();
const IdeaDb = require("../models/ideas");

/** Memos Routes **/
router.get('/memos', NotesController.notes_index);
router.get('/memo/:id', NotesController.note_one);
router.post('/memo', [
    check('name').custom(async value => {
      const checkName = await NotifDb.findOne({ name: value })
      if (checkName) return Promise.reject('Name already taken')
    }),
  ], NotesController.note_view
);
router.put('/memo/:id', NotesController.update_note);
router.delete('/memo/:id', NotesController.delete_note);
/** End  Memos **/

/** Ideas Routes **/
router.get('/ideas', ideasController.ideas_index);
router.get('/ideas/:id', ideasController.ideas_one);
router.post('/idea', [
  check('group').custom(async value => {
    const checkName = await IdeaDb.findOne({ group: value })
    if (checkName) return Promise.reject('Name already taken')
  }),
], ideasController.idea_view
);

router.put('/idea/:id', ideasController.update_idea);
router.delete('/idea/:id', ideasController.delete_idea);
/** End  Ideas **/

/** Profile Routes **/
router.get('/profile', ProfileController.get_profile);
router.put('/profile/:id', ProfileController.update_profile);
/** End  Profile **/

/** Groups routes**/
router.get('/groups', GroupController.get_groups);
router.post('/group', [
  check('name').custom(async value => {
    const checkName = await GroupsDb.findOne({ name: value })
    if (checkName) return Promise.reject('Name already taken')
  }),
], GroupController.add_group
);
router.put('/group/:id', GroupController.update_group);
router.delete('/group/:id', GroupController.delete_group);

/** accounts **/
router.get('/accounts', AccountsController.get_accounts);
router.post('/account', [
  check('type').custom(async value => {
    const checkType = await AccountsDb.findOne({ type: value })
    if (checkType) return Promise.reject('Type already taken')
  }),
], AccountsController.add_account
);
router.put('/account/:id', AccountsController.update_account);
router.delete('/account/:id', AccountsController.delete_account);

/** Energy **/
router.get('/e-controls', EnergyControlsController.get_energy_controls);
router.post('/e-controls', [
      check('name').custom(async name => {
        const checkType = await EnergyControlsDb.findOne({ type: name })
        if (checkType) return Promise.reject('Name already taken')
      }),
    ], EnergyControlsController.add_energy_controls
);
router.put('/e-controls/:id', EnergyControlsController.update_energy_controls);
router.delete('/e-controls/:id', EnergyControlsController.delete_energy_controls);



module.exports = router;
