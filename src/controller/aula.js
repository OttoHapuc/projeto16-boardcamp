import { dataBase } from "../config/dataBase";

export async function aula(req,res){
    try {
        const receitas = await dataBase.query("SELECT * FROM receitas")
        res.send(receitas.rows)
    } catch (error) {
        res.status(500)
    }
}