import { dataBase } from "../config/dataBase";

export async function getGame(req,res){
    try {
        const receitas = await dataBase.query("SELECT * FROM receitas")
        res.send(receitas.rows)
    } catch (error) {
        res.status(500)
    }
}
export async function postGame(req, res){
    try {
        
    } catch (error) {
        res.status(500)
    }
}
