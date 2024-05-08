const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  register: async (req, res, next) => {
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

  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      let user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "invalid email or password",
          data: null,
        });
      }

      let isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          status: false,
          message: "invalid email or password",
          data: null,
        });
      }

      delete user.password;
      let token = jwt.sign(user, JWT_SECRET_KEY);

      return res.status(201).json({
        status: true,
        message: "OK",
        data: { ...user, token },
      });
    } catch (error) {
      next(error);
    }
  },

  auth: async (req, res, next) => {
    try {
      return res.status(200).json({
        status: true,
        message: "OK",
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
};
