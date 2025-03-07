import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { env } from "@/env";


export const auth = betterAuth({
    database: new Pool({
        connectionString: env.DATABASE_URL,
    }),
    emailAndPassword: {  
        enabled: true
    },
});
