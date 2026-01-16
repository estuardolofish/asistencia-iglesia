-- CreateTable
CREATE TABLE "Hermano" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hermano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agrupacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agrupacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membresia" (
    "id" SERIAL NOT NULL,
    "hermanoId" INTEGER NOT NULL,
    "agrupacionId" INTEGER NOT NULL,

    CONSTRAINT "Membresia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL,
    "abierta" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" SERIAL NOT NULL,
    "actividadId" INTEGER NOT NULL,
    "hermanoId" INTEGER NOT NULL,
    "marcadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Hermano_nombres_apellidos_idx" ON "Hermano"("nombres", "apellidos");

-- CreateIndex
CREATE UNIQUE INDEX "Agrupacion_nombre_key" ON "Agrupacion"("nombre");

-- CreateIndex
CREATE INDEX "Membresia_agrupacionId_idx" ON "Membresia"("agrupacionId");

-- CreateIndex
CREATE UNIQUE INDEX "Membresia_hermanoId_agrupacionId_key" ON "Membresia"("hermanoId", "agrupacionId");

-- CreateIndex
CREATE INDEX "Actividad_fechaHora_idx" ON "Actividad"("fechaHora");

-- CreateIndex
CREATE INDEX "Asistencia_actividadId_idx" ON "Asistencia"("actividadId");

-- CreateIndex
CREATE INDEX "Asistencia_hermanoId_idx" ON "Asistencia"("hermanoId");

-- CreateIndex
CREATE UNIQUE INDEX "Asistencia_actividadId_hermanoId_key" ON "Asistencia"("actividadId", "hermanoId");

-- AddForeignKey
ALTER TABLE "Membresia" ADD CONSTRAINT "Membresia_hermanoId_fkey" FOREIGN KEY ("hermanoId") REFERENCES "Hermano"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membresia" ADD CONSTRAINT "Membresia_agrupacionId_fkey" FOREIGN KEY ("agrupacionId") REFERENCES "Agrupacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_hermanoId_fkey" FOREIGN KEY ("hermanoId") REFERENCES "Hermano"("id") ON DELETE CASCADE ON UPDATE CASCADE;
