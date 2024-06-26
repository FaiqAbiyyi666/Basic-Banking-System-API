const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  store: async (req, res, next) => {
    try {
      let { name, email, password, identity_type, identity_number, address } =
        req.body;

      let exist = await prisma.user.findFirst({
        where: { email },
      });
      let exist_iNumber = await prisma.profile.findFirst({
        where: { identity_number },
      });

      if (exist || exist_iNumber) {
        return res.status(400).json({
          status: false,
          message: "Email or Identity Number already used!",
        });
      }

      let encryptedPassword = await bcrypt.hash(password, 10);

      let user = await prisma.user.create({
        data: {
          name,
          email,
          password: encryptedPassword,
          profile: {
            create: { identity_type, identity_number, address },
          },
        },
        // untuk menampilkan name dan age di json
        include: {
          profile: true,
        },
      });

      res.status(201).json({
        status: true,
        message: "OK",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
  // Untuk menampilkan semua user
  index: async (req, res, next) => {
    try {
      // /users?search=bagus
      let { search } = req.query;

      let users = await prisma.user.findMany({
        where: {
          name: { contains: search },
        },
        include: {
          profile: true,
        },
      });

      res.status(200).json({
        status: true,
        message: "OK",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },

  // Untuk menampilkan user berdasarkan id
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);

      let user = await prisma.user.findUnique({
        where: { id },
        include: { profile: true },
      });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Can't find user with id " + id,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
