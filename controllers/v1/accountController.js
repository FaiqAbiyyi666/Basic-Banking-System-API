const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  register: async (req, res, next) => {
    try {
      let { bank_name, bank_account_number, balance, user_id } = req.body;

      let exist = await prisma.bankAccount.findFirst({
        where: { bank_account_number },
      });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "Bank Account Number already used!",
        });
      }

      let bankAccount = await prisma.bankAccount.create({
        data: {
          bank_name,
          bank_account_number,
          balance,
          user_id,
        },
      });

      res.status(201).json({
        status: true,
        message: "OK",
        data: bankAccount,
      });
    } catch (err) {
      next(err);
    }
  },

  // Untuk menampilkan semua data account
  index: async (req, res, next) => {
    try {
      let accounts = await prisma.bankAccount.findMany();

      res.status(200).json({
        status: true,
        message: "OK",
        data: accounts,
      });
    } catch (err) {
      next(err);
    }
  },

  // Untuk menampilkan user berdasarkan id
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);

      let account = await prisma.bankAccount.findUnique({
        where: { id },
      });

      if (!account) {
        return res.status(400).json({
          status: false,
          message: "Can't find account with id " + id,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: account,
      });
    } catch (err) {
      next(err);
    }
  },
};
