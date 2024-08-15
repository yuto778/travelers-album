-- CreateTable
CREATE TABLE "CardPicture" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "picture" TEXT,
    "photoDate" DATE,

    CONSTRAINT "CardPicture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FellowTraveler" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fellowId" TEXT NOT NULL,

    CONSTRAINT "FellowTraveler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripBoard" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "startday" DATE NOT NULL,
    "endday" DATE,
    "thumbnail" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripCard" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "memo" TEXT,
    "thumbnailId" SERIAL NOT NULL,
    "locationPoint" TEXT,

    CONSTRAINT "TripCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripboardUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "TripboardUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "icon" TEXT,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CardPicture" ADD CONSTRAINT "CardPicture_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "TripCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FellowTraveler" ADD CONSTRAINT "FellowTraveler_fellowId_fkey" FOREIGN KEY ("fellowId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FellowTraveler" ADD CONSTRAINT "FellowTraveler_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripBoard" ADD CONSTRAINT "TripBoard_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripCard" ADD CONSTRAINT "TripCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "TripBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripboardUser" ADD CONSTRAINT "TripboardUser_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "TripBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripboardUser" ADD CONSTRAINT "TripboardUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
