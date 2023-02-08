import { dataBase } from "../config/dataBase";

export async function getRentals(req,res){
    try {
        const receitas = await dataBase.query("SELECT * FROM receitas")
        res.send(receitas.rows)
    } catch (error) {
        res.status(500)
    }
}
export async function postRentals(req,res){}
export async function postRentalsIdFinish(req,res){}
export async function deleteRentalsId(req,res){}