import express from 'express';

import {getLinks, createLink, deleteLink, getOtherLinks} from '../controllers/mutations/link.mutation.js';

import clientAuth from '../middlewares/clientAuth.js';

const linkRouter = express.Router();

linkRouter.post('/create-link', clientAuth, createLink);
linkRouter.get('/get-links', clientAuth, getLinks);
linkRouter.delete('/delete-link', clientAuth, deleteLink);
linkRouter.get('/get-other-links', clientAuth, getOtherLinks)


export default linkRouter;