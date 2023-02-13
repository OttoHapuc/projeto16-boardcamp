import { dataBase } from "../config/dataBase.js";

export async function getCustomers(req, res) {
    try {
        const customers = await dataBase.query("SELECT * FROM customers;")
        res.send(customers.rows)
    } catch (error) {
        res.status(500)
    }
}
export async function getCustomersId(req, res) {
    const { id } = req.params
    if(id.length < 11 || id.length > 11) res.sendStatus(422);
    try {
        const result = await pool.query(`
        SELECT id, name, phone, cpf, birthday 
        FROM customers WHERE id = $1;`,
            [id]);

        if (result.rows.length === 0) {
            return res.sendStatus(404);
        }
        return res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
export async function postCreateCustomers(req, res) {
    const { name, cpf, phone, birthday } = req.body;
    try {
        const { rows: cpfCheckResult } = await client.query(`
        SELECT COUNT(*) FROM customers 
        WHERE cpf = $1;`,
            [cpf]);
        if (cpfCheckResult[0].count > 0) {
            return res.status(409).send();
        }
        await client.query(`
        INSERT INTO customers (name, cpf, phone, birthday) 
        VALUES ($1, $2, $3, $4);`,
            [name, cpf, phone, birthday]);
        return res.status(201).send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}
export async function putUpdateCustomers(req, res) {
    const { name, cpf, phone, birthday } = req.body;
    try {
        const { rows: cpfCheckResult } = await client.query(`
        SELECT COUNT(*) FROM customers 
        WHERE cpf = $1;`,
            [cpf]);
        if (cpfCheckResult[0].count != 1) {
            return res.status(409).send();
        }
        await client.query(`
        UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 
        WHERE id = $5;`,
            [name, cpf, phone, birthday]);
        return res.status(201).send();
    } catch (err) {
        console.error(err);
        return res.status(500).send();
    }
}