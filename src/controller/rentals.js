import { dataBase } from "../config/dataBase.js";

export async function getRentals(req, res) {
    try {
        const rentals = await dataBase.query("SELECT * FROM rentals;")
        res.send(rentals.rows)
    } catch (error) {
        res.sendStatus(500)
    }
}
export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const customer = await dataBase.query('SELECT * FROM customers WHERE id = $1;', [customerId]);
    if (customer.rowCount === 0) {
        return res.status(400).send('Customer does not exist');
    }
    const game = await dataBase.query('SELECT * FROM games WHERE id = $1;', [gameId]);
    if (game.rowCount === 0) {
        return res.status(400).send('Game does not exist');
    }
    const availableGames = await dataBase.query('SELECT * FROM rentals WHERE "returnDate" IS NULL AND "gameId" = $1;', [gameId]);
    const availableQuantity = game.rows[0].stockTotal - availableGames.rowCount;
    if (availableQuantity <= 0) {
        return res.status(400).send('Game not available');
    }
    const rentDate = new Date();
    const originalPrice = game.rows[0].pricePerDay * daysRented;
    try {
        const result = await dataBase.query(
            'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5);',
            [customerId, gameId, rentDate, daysRented, originalPrice]
        );
        res.status(201).end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error renting game');
    }
}
export async function postRentalsIdFinish(req, res) {
    const { id } = req.params;
    try {
        const rentalResult = await dataBase.query('SELECT * FROM rentals WHERE id = $1;', [id]);
        const rental = rentalResult.rows[0];
        if (!rental) {
            res.status(404).end();
            return;
        }
        if (rental.returnDate) {
            res.status(400).end();
            return;
        }
        const now = new Date();
        const delayTime = Math.max(now - rental.expectedReturnDate, 0);
        const delayDays = Math.ceil(delayTime / (1000 * 60 * 60 * 24));
        const gameResult = await dataBase.query('SELECT * FROM games WHERE id = $1;', [rental.gameId]);
        const game = gameResult.rows[0];
        const delayFee = delayDays * game.pricePerDay;
        await dataBase.query('UPDATE rentals SET returnDate = $1, delayFee = $2 WHERE id = $3;', [now, delayFee, id]);
        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}
export async function deleteRentalsId(req, res) {
    const id = req.params.id;
  if (!Number.isInteger(+id) || +id < 1) {
    res.status(400).send('O ID fornecido é inválido.');
    return;
  }
  try {
    const checkRentalQuery = 'SELECT * FROM rentals WHERE id = $1;';
    const { rows } = await dataBase.query(checkRentalQuery, [id]);
    if (rows.length === 0) {
      return res.status(404).send(`Não foi encontrado um aluguel com ID ${id}.`);
    }
    const rental = rows[0];
    if (rental.returnDate !== null) {
      return res.status(400).send(`O aluguel com ID ${id} já está finalizado.`);
      ;
    }
    const deleteRentalQuery = 'DELETE FROM rentals WHERE id = $1;';
    await dataBase.query(deleteRentalQuery, [id]);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao excluir o aluguel.');
  }
}