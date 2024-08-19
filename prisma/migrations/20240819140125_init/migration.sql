-- CreateTable
CREATE TABLE "Users" (
    "id" VARCHAR(50) NOT NULL,
    "find_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fellowtravelers" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "fellow_id" TEXT,

    CONSTRAINT "Fellowtravelers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tripboards_Users" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "tripboard_id" TEXT NOT NULL,
    "inviteuser_id" TEXT NOT NULL,
    "repestion" BOOLEAN,

    CONSTRAINT "Tripboards_Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tripboards" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "start_at" DATE NOT NULL,
    "end_at" DATE,
    "lastupdate_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tripboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tripcards" (
    "id" TEXT NOT NULL,
    "board_id" TEXT NOT NULL,
    "memo" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "Tripcards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cardpictures" (
    "id" VARCHAR(50) NOT NULL,
    "tripcard_id" TEXT NOT NULL,
    "picture_url" TEXT,
    "take_at" DATE,
    "location_pointx" DOUBLE PRECISION NOT NULL,
    "location_pointy" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Cardpictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_find_id_key" ON "Users"("find_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Fellowtravelers" ADD CONSTRAINT "Fellowtravelers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowtravelers" ADD CONSTRAINT "Fellowtravelers_fellow_id_fkey" FOREIGN KEY ("fellow_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tripboards_Users" ADD CONSTRAINT "Tripboards_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tripboards_Users" ADD CONSTRAINT "Tripboards_Users_tripboard_id_fkey" FOREIGN KEY ("tripboard_id") REFERENCES "Tripboards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tripboards_Users" ADD CONSTRAINT "Tripboards_Users_inviteuser_id_fkey" FOREIGN KEY ("inviteuser_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tripboards" ADD CONSTRAINT "Tripboards_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tripcards" ADD CONSTRAINT "Tripcards_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Tripboards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cardpictures" ADD CONSTRAINT "Cardpictures_tripcard_id_fkey" FOREIGN KEY ("tripcard_id") REFERENCES "Tripcards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
