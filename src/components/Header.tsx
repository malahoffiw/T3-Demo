import React from "react"
import Link from "next/link"
import { AiOutlineGithub } from "react-icons/ai"

type HeaderProps = {
    children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
    return (
        <div>
            <header className="absolute top-0 left-0 z-10 flex h-16 w-full items-center justify-around bg-white text-black">
                <Link href="/">
                    <h1 className="cursor-pointer text-2xl font-bold">
                        T3 Demo
                    </h1>
                </Link>
                <a
                    href="https://github.com/malahoffiw"
                    target="_blank"
                    rel="noreferrer"
                >
                    <AiOutlineGithub className="h-7 w-7" />
                </a>
            </header>
            {children}
        </div>
    )
}

export default Header
