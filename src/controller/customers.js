import { dataBase } from "../config/dataBase";

export async function getCustomers(req,res){
    try {
        const receitas = await dataBase.query("SELECT * FROM receitas")
        res.send(receitas.rows)
    } catch (error) {
        res.status(500)
    }
}
export async function getCustomersId(req,res){}
export async function postCreateCustomers(req,res){}
export async function postUpdateCustomers(req,res){}