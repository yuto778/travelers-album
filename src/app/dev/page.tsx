import { prisma } from "@/lib/client";
import Dev from "./Dev";

//デート型を日本語表記にする関数（年月日曜日）
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
};

const page = async () => {
  const users = await prisma.user.findMany();

  console.log(formatDate(users[0].birthday));

  console.log(users);

  return (
    <>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <h2>ユーザー名: {user.name}</h2>
            <h2>パスワード: {user.password}</h2>
            <h2>Email: {user.email}</h2>
            <h2>誕生日: {formatDate(user.birthday)}</h2>
          </div>
        ))}
        <Dev />
      </div>
    </>
  );
};

export default page;
