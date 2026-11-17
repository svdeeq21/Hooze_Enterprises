import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { publicPaths } from "@/lib/site-config";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it.each(publicPaths)(
    "matches a real page for %s instead of falling back to not found",
    (path) => {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    },
  );

  it("does not match an unknown page", () => {
    expect(router.matchRoutes("/definitely-not-a-page").at(-1)?.routeId).toBe(rootRouteId);
  });
});
