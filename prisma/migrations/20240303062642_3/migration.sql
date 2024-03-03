-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Amount" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "AccountId" INTEGER NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Id_key" ON "User"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_Id_key" ON "Accounts"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_id_key" ON "Currency"("id");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Accounts"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
