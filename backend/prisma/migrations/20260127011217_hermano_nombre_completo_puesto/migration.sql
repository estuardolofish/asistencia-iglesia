/*
  Warnings:

  - You are about to drop the column `apellidos` on the `Hermano` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `Hermano` table. All the data in the column will be lost.
  - Added the required column `nombreCompleto` to the `Hermano` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Hermano_nombres_apellidos_idx";

-- AlterTable
ALTER TABLE "Hermano" DROP COLUMN "apellidos",
DROP COLUMN "nombres",
ADD COLUMN     "nombreCompleto" TEXT NOT NULL,
ADD COLUMN     "puesto" TEXT;

-- CreateIndex
CREATE INDEX "Hermano_nombreCompleto_idx" ON "Hermano"("nombreCompleto");
