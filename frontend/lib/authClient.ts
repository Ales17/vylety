import { magicLinkClient, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  plugins: [magicLinkClient(), adminClient()],
});
