CREATE POLICY "Trusted website services manage enquiries"
ON public.project_enquiries
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);