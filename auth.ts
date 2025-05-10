import NextAuth, {User,NextAuthConfig} from "next-auth"
import Credentials from "next-auth/providers/credentials";

//nextauth参考
//https://zenn.dev/hayato94087/articles/5656a0eb015332
//https://zenn.dev/gunjo/articles/6d3b5c50d95f3c

export const config:NextAuthConfig = {
    providers:[
        Credentials({
            name:"KNZProvider",
            credentials:{
                username:{label:"Username",type:"text",placeholder:"username"},
                password:{label:"Password",type:"password"},
            },
            async authorize(credentials):Promise<User|null>{
                const user={username:"kenzo",password:"1125"};
                const authorize =  user.username===credentials.username&&
                user.password===credentials.password;
                if(authorize){
                    return { id: "1", name: "Test User", email: "test@example.com" }
                }else{
                    return null;
                }
            }
        })
    ],
    callbacks:{
        authorized({auth,request:{nextUrl}}){
            const isLogin = !!auth?.user;
            const currentPath = nextUrl.pathname.startsWith('/actions')
            const hometPath = nextUrl.pathname.startsWith('/root')
            const userPage = nextUrl.pathname.startsWith('/user');
            const mainPage = nextUrl.pathname.startsWith('/Mainpage');
            const editpage = nextUrl.pathname.startsWith('/Edit');
            const rootPage = nextUrl.pathname.startsWith('/root');
            console.log(isLogin,"isLogin");
            if(isLogin){
                if(hometPath||userPage||mainPage||editpage)return true;
                if(currentPath&&!hometPath)return Response.redirect(new URL('/root/table',nextUrl.origin))
            }else{
                return false;
            }
        },
    },
    secret:process.env.AUTH_SECRET,
    basePath:"/api/auth",
    pages:{
        signIn:'/actions'
    }
}

export const {handlers,auth,signIn,signOut} = NextAuth(config);