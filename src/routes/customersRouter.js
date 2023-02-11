import {Router} from 'express';
import { getCustomers, getCustomersId, postCreateCustomers, putUpdateCustomers } from '../controller/customers.js';
import { validateSchema } from '../middleware/validationSchema.js';
import { customerSchema } from '../schema/customersSchema.js';

const customers = Router();

customers.get('/customers', getCustomers);
customers.get('/customers/:id', getCustomersId);
customers.post('/customers', validateSchema(customerSchema),postCreateCustomers);
customers.put('/customers', validateSchema(customerSchema), putUpdateCustomers);

export default customers;