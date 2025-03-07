import { authClient } from "@/lib/auth-client"; //import the auth client 

export const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard"
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    });
};