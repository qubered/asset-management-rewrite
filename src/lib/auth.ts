import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "@/env";
import { sendEmail } from "@/lib/email-tools"
import { organization } from "better-auth/plugins"



export const auth = betterAuth({
    database: new Pool({
        connectionString: env.DATABASE_URL,
    }),
    plugins: [ 
        organization() 
    ],
    emailAndPassword: {  
        enabled: true,
        autoSignIn: false
    },
    emailVerification: {
        sendOnSignUp: true,
        requireEmailVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendEmail(
                'auth@web.qubered.com',
                user.email,
                'Verify your email address',
                `Click the link to verify your email: ${url}`
            )
        }
    }
});
