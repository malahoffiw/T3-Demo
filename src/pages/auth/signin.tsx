import { GetServerSideProps } from "next"
import {
    signIn,
    getCsrfToken,
    getProviders,
    LiteralUnion,
    ClientSafeProvider,
} from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import styles from "../../styles"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"

type SigninProps = {
    csrfToken?: string
    providers: Record<
        LiteralUnion<BuiltInProviderType>,
        ClientSafeProvider
    > | null
}

const Signin = ({ csrfToken, providers }: SigninProps) => {
    return (
        <div className="container mx-auto my-32 flex flex-col items-center gap-4">
            <div>
                <p className="text-red-600">
                    Email Auth is not set up yet, use Github instead
                </p>
            </div>

            <form
                className="flex w-96 flex-col items-center gap-4 border-b pb-10"
                method="post"
                action="/api/auth/signin/email"
            >
                <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                />
                <input
                    className={styles.input}
                    placeholder="Your email address"
                />
                <button className={`${styles.btn}`}>Sign in with Email</button>
            </form>

            <section className="flex flex-col items-center gap-4">
                <p>or</p>
                {providers &&
                    Object.values(providers).map((provider) => {
                        if (provider.name === "Email") {
                            return
                        }
                        return (
                            <div key={provider.name}>
                                <button
                                    className={`${styles.btn}`}
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        )
                    })}
            </section>
        </div>
    )
}

export default Signin

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerAuthSession({
        req: context.req,
        res: context.res,
    })

    if (session?.user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
        props: {
            providers,
            csrfToken,
        },
    }
}
