import { createAuthClient } from "better-auth/react";
import { env } from "../../../env";
import { toast } from "sonner";
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  forgetPassword,
  sendVerificationEmail,
  resetPassword,
  oneTap,
} = authClient;
