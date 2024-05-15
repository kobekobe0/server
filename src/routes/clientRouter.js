import express from 'express';
import {addClientToScanned, getClient, getOtherClient, getScannedClients, loginClient, signUpClient} from '../controllers/mutations/client.mutation.js';
import clientAuth from '../middlewares/clientAuth.js';

const clientRouter = express.Router();

clientRouter.post('/sign-up-client', signUpClient);
clientRouter.post('/login-client', loginClient);
clientRouter.post('/add-other-client', clientAuth, addClientToScanned)

clientRouter.get('/get-client', clientAuth, getClient);

clientRouter.get('/get-other-client', clientAuth, getOtherClient)
clientRouter.get('/get-scanned-client', clientAuth, getScannedClients)




export default clientRouter;