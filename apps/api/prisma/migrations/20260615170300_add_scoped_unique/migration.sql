/*
  Warnings:

  - A unique constraint covering the columns `[name,tenant_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,project_id]` on the table `Template` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_name_tenant_id_key" ON "Project"("name", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_project_id_key" ON "Template"("name", "project_id");
