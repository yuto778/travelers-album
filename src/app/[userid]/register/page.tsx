import { prisma } from "@/lib/client";
import { FellowTraveler, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import Header from "../../../../components/Header";
import "../../../../styles/global.css";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type FellowTravelerWithUser = FellowTraveler & {
  User_FellowTraveler_fellowIdToUser: User;
};

const page = async ({ params: { userid } }: { params: { userid: string } }) => {
  console.log("registerでFetching session...");
  let Username, UserId, UserEmail;
  let registers: FellowTravelerWithUser[] = [];
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("registerでセッション情報確保ならず");
      redirect("/login");
    } else {
      console.log("registerでセッションの情報を出してみます", session);
      Username = session.user.name;
      UserId = session.user.id;
      UserEmail = session.user.email;

      console.log(Username, UserId, UserEmail);
      registers = await prisma.fellowTraveler.findMany({
        where: { userId: UserId },
        include: {
          User_FellowTraveler_fellowIdToUser: true, // fellowIdに関連するユーザー情報を含める
        },
      });
      console.log(registers);
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
  }

  const datafetch = () => {
    // useridでデータフェッチ
    userid;
  };
  return (
    <div className="h-screen w-full layer-gradient flex flex-col">
      <Header menu userid={UserId} />
      <div className="flex-1 flex items-center justify-center ">
        <div className="h-3/4 w-1/2 bg-green-400 bg-opacity-25 rounded-xl shadow-custom-shadow  px-20  py-7 space-y-10 ">
          <h2 className="text-center text-2xl font-bold">登録者一覧</h2>
          <div className="grid grid-cols-2 gap-5 ">
            {registers.length === 0 && <div>登録者がいません</div>}
            {registers.map((register, index) => (
              <div
                key={register.id}
                className="border-b-2 border-gray-400 flex items-center  pb-2 px-10"
              >
                <div className="size-12 bg-slate-500 relative rounded-full overflow-hidden">
                  <Image
                    src={"/images/routephoto.jpg"}
                    fill
                    className="object-cover"
                    alt="プロフィール写真"
                  />
                </div>
                <span className="flex-1"></span>
                <h2 className="text-lg ">
                  {register.User_FellowTraveler_fellowIdToUser.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
