-- ============================================================================
-- InkMonk Research — PostgreSQL / Supabase Row-Level Security (RLS) Policies
-- Run this script if migrating from SQLite to PostgreSQL / Supabase
-- ============================================================================

-- 1. Enable RLS on all primary tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectFile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ServiceRule" ENABLE ROW LEVEL SECURITY;

-- 2. User Table Policies
-- Users can view their own profile; Admins can view all
CREATE POLICY "Users can view own profile" ON "User"
  FOR SELECT
  USING (auth.uid()::text = id OR auth.jwt() ->> 'role' IN ('ADMIN', 'STAFF'));

CREATE POLICY "Users can update own profile" ON "User"
  FOR UPDATE
  USING (auth.uid()::text = id);

-- 3. Project Table Policies
-- Clients can only see projects they own; Staff/Admin can see all
CREATE POLICY "Clients can view own projects" ON "Project"
  FOR SELECT
  USING (auth.uid()::text = "clientId" OR auth.jwt() ->> 'role' IN ('ADMIN', 'STAFF'));

CREATE POLICY "Staff can update projects" ON "Project"
  FOR ALL
  USING (auth.jwt() ->> 'role' IN ('ADMIN', 'STAFF'));

-- 4. ProjectFile Table Policies
CREATE POLICY "Clients can view own project files" ON "ProjectFile"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Project"
      WHERE "Project".id = "ProjectFile"."projectId"
      AND ("Project"."clientId" = auth.uid()::text OR auth.jwt() ->> 'role' IN ('ADMIN', 'STAFF'))
    )
  );

-- 5. Message Table Policies
CREATE POLICY "Participants can view project messages" ON "Message"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Project"
      WHERE "Project".id = "Message"."projectId"
      AND ("Project"."clientId" = auth.uid()::text OR auth.jwt() ->> 'role' IN ('ADMIN', 'STAFF'))
    )
  );

-- 6. Lead Table Policies
-- Only Admin and Staff can read leads
CREATE POLICY "Only staff can view leads" ON "Lead"
  FOR SELECT
  USING (auth.jwt() ->> 'role' IN ('ADMIN', 'STAFF'));

-- 7. AuditLog Table Policies
-- Strictly read-only for Admins; cannot be altered or deleted by anyone
CREATE POLICY "Only admins can view audit logs" ON "AuditLog"
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'ADMIN');
