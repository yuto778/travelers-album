"use server";

import { SignUpFormSchema } from "@/components/Form";
import { prisma } from "@/prisma/client";
// /actions/SignUp.ts

import bcrypt from "bcrypt";
import { stringify } from "querystring";

export const SignUp = async (value: SignUpFormSchema) => {
  try {
    // パスワードをハッシュ化
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.FirstPassword, saltRounds);

    // ユーザーデータを準備
    const userData = {
      id: "3030",
      name: value.UserName,
      email: value.Email,
      password: hashedPassword,
      birthday: value.birthday,
    };

    const newUser = await prisma.user.create({
      data: userData,
    });

    console.log("新規登録成功signup.ts");

    return { success: true, data: newUser };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};
