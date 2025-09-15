import express from 'express';
import * as workCont from '../controller/work.controller.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  await workCont.getAllWork(req, res);
});

// router.get("/get-employee/:empId", async (req, res) => {
  // await workCont. 
// })

router.get('/my-work/:userId', async (req, res) => {
  await workCont.getSpecific(req, res);
});
router.post('/create-work', async (req, res) => {
  await workCont.createWork(req, res);
});
router.put('/update-work-status/:id', async (req, res) => {
  await workCont.updateStatus(req, res);
});
router.delete('/delete-all/:userId', async (req, res) => {
  await workCont.deleteAllFromUser(req, res);
});
router.delete('/delete-specific/:id', async (req, res) => {
  await workCont.deleteSpefic(req, res);
});


export default router