-- ============================================================
-- ANSPORTIA — Supabase Storage setup
-- Run this in: Supabase Dashboard > SQL Editor
-- (or create the bucket via Dashboard > Storage and skip the insert)
-- ============================================================

-- 1) Create ONE private bucket for all documents.
insert into storage.buckets (id, name, public)
values ('ansportia-documents', 'ansportia-documents', false)
on conflict (id) do nothing;

-- 2) RLS policies.
--    The NestJS backend uses the SERVICE ROLE key, which BYPASSES RLS,
--    so these policies only matter if you ever let the browser hit
--    Storage directly with the anon/user key. Recommended default:
--    keep the bucket private and let ONLY the backend read/write.
--
--    The policy below denies all direct anon/authenticated access.
--    (No SELECT/INSERT policy => no access for non-service keys.)
--
--    If later you want logged-in users to read their own files directly,
--    add a policy like:
--
-- create policy "authenticated can read ansportia-documents"
--   on storage.objects for select
--   to authenticated
--   using ( bucket_id = 'ansportia-documents' );
