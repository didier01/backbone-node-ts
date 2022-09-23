import { Request, Response } from "express";
import UserModel from "../models/user-model";

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.json({
    msg: "GetUsers",
    users,
  });
};

export const getUserId = async (req: Request, res: Response) => {
  let id = req.params.id;
  const user = await UserModel.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: `El usuario con el id: ${id} no existe!!!`,
    });
  }
  res.json({
    msg: "GetUserId",
    user,
  });
};

export const postUser = async (req: Request, res: Response) => {
  let { body } = req;
  try {
    const emailExist = await UserModel.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExist) {
      return res.status(400).json({
        msg: "Ya existe un usuario con este correo",
      });
    }

    const userToSave = UserModel.build(body);
    await userToSave.save();
    res.json({
      msg: "postUser",
      body,
    });
  } catch (error) {
    console.log("error");
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  let id = req.params.id;
  let { body } = req;
  try {
    const userExist = await UserModel.findByPk(id);
    if (!userExist) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }

    const emailExist = await UserModel.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExist) {
      return res.status(400).json({
        msg: "Ya existe un usuario con este correo",
      });
    }

    await userExist.update(body);

    res.json({
      msg: "putUser actualizado",
      body,
    });
  } catch (error) {
    console.log("error");
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  let id = req.params.id;

  const user = await UserModel.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: `El usuario con el id: ${id} no existe!!!`,
    });
  }

  await user.update({status: false})
  // await user.destroy();

  res.json({
    msg: "deleteUser Usuario eliminado",
    id,
  });
};
