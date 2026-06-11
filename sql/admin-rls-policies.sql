-- SteepWood admin RLS policies
--
-- DEFERRED MANUAL STEP — do not block Phases 1–4 code work.
-- Apply after Phase 4 code is complete, before production launch.
-- Full runbook: docs/STEEPWOOD-MANUAL-OPS.md §2.3
--
-- Apply in Supabase SQL Editor (Dashboard → SQL → New query)
-- Prisma uses the service role / direct connection and bypasses RLS.
-- These policies protect against direct anon/authenticated API access.

-- Helper: only @steepwood.com.au authenticated users
CREATE OR REPLACE FUNCTION public.is_steepwood_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT
    auth.role() = 'authenticated'
    AND coalesce(auth.jwt() ->> 'email', '') ILIKE '%@steepwood.com.au';
$$;

-- ---------------------------------------------------------------------------
-- admin_users: authenticated users can read only their own row
-- ---------------------------------------------------------------------------
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_users_select_own" ON public.admin_users;
CREATE POLICY "admin_users_select_own"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- quote_requests
-- ---------------------------------------------------------------------------
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "quote_requests_admin_all" ON public.quote_requests;
CREATE POLICY "quote_requests_admin_all"
  ON public.quote_requests
  FOR ALL
  TO authenticated
  USING (public.is_steepwood_admin())
  WITH CHECK (public.is_steepwood_admin());

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials_admin_all" ON public.testimonials;
CREATE POLICY "testimonials_admin_all"
  ON public.testimonials
  FOR ALL
  TO authenticated
  USING (public.is_steepwood_admin())
  WITH CHECK (public.is_steepwood_admin());

-- ---------------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------------
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_posts_admin_all" ON public.blog_posts;
CREATE POLICY "blog_posts_admin_all"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (public.is_steepwood_admin())
  WITH CHECK (public.is_steepwood_admin());

-- ---------------------------------------------------------------------------
-- portfolio_projects
-- ---------------------------------------------------------------------------
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "portfolio_projects_admin_all" ON public.portfolio_projects;
CREATE POLICY "portfolio_projects_admin_all"
  ON public.portfolio_projects
  FOR ALL
  TO authenticated
  USING (public.is_steepwood_admin())
  WITH CHECK (public.is_steepwood_admin());

-- ---------------------------------------------------------------------------
-- Verification (run as anon in SQL editor after policies are applied):
-- SET ROLE anon;
-- SELECT count(*) FROM quote_requests;  -- should fail or return 0 rows
-- RESET ROLE;
