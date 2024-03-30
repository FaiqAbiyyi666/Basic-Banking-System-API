const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  store: async (req, res, next) => {
    try {
      let { amount, source_account_id, source_destination_id } = req.body;

      let transaction = await prisma.transaction.create({
        data: {
          amount,
          source_account_id,
          source_destination_id,
        },
      });

      res.status(201).json({
        status: true,
        message: "OK",
        data: transaction,
      });
    } catch (err) {
      next(err);
    }
  },

  // Untuk menampilkan semua data transactions
  index: async (req, res, next) => {
    try {
      let transactions = await prisma.transaction.findMany();

      res.status(200).json({
        status: true,
        message: "OK",
        data: transactions,
      });
    } catch (err) {
      next(err);
    }
  },

  // Untuk menampilkan transaction berdasarkan id
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);

      let transaction = await prisma.transaction.findUnique({
        where: { id },
      });

      if (!transaction) {
        return res.status(400).json({
          status: false,
          message: "Can't find transaction with id " + id,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: transaction,
      });
    } catch (err) {
      next(err);
    }
  },
};
