import { dataBase } from "../config/dataBase.js";

export async function getGame(req,res){
    try {
        const games = await dataBase.query(`SELECT * FROM games;`);
        res.send(games.rows);
    } catch (error) {
        res.status(500).send(error);
    };
}
export async function postGame(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body;
    try {
        await dataBase.query(`
        INSERT INTO games (name, image, stocktotal, priceperpay)
        VALUES ($1, $2, $3, $4);
        `, [name, image, stockTotal, pricePerDay]);
        res.status(201).send("OK");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
