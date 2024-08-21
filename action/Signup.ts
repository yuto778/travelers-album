"use server";

import { SignUpFormSchema } from "@/components/Form";
import { prisma } from "@/lib/client";
import { v4 as uuidv4 } from "uuid";
// /actions/SignUp.ts

import bcrypt from "bcrypt";
import { icons } from "lucide-react";

export const SignUp = async (value: SignUpFormSchema) => {
  try {
    // パスワードをハッシュ化
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.FirstPassword, saltRounds);

    console.log(hashedPassword);

    const uuid = uuidv4();

    // ユーザーデータを準備
    const userData = {
      id: uuid,
      find_id: uuid,
      name: value.UserName,
      email: value.Email,
      icon: "/icons/Icon.jpeg",
      password: hashedPassword,
      birthday: value.birthday,
    };

    const newUser = await prisma.users.create({
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
