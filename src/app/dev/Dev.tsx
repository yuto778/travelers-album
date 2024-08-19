// "use client";

// import { useSession } from "next-auth/react";
// // /Dev.tsx

// import React from "react";
// import ImageUploadForm from "./File";

// const Dev = () => {
//   const { data: session, status } = useSession();
//   if (status === "loading") {
//     return (
//       <>
//         <div>...loading</div>
//       </>
//     );
//   }

//   if (status === "authenticated") {
//     return (
//       <>
//         <div>{session.user.email}</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div>sessionがありません</div>
//       <ImageUploadForm />
//     </>
//   );
// };

// export default Dev;
