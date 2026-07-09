import Link from "next/link";

function Header() {
    return (
        <header className="flex justify-around items-baseline py-4 px-5">
            <div className="flex flex-row justify-start gap-4">
                <Link className="text-2xl hover:underline cursor-pointer" href={"/"} >
                    <span className="text-red-500">Gas</span>
                    <span className="text-blue-900">Wizzard</span>
                </Link>
            </div>
            <nav className="self-center">
                <ul className="flex text-lg gap-3">
                    <li className="hover:underline cursor-pointer">
                        <Link href={"/map"}>Map</Link>
                    </li>
                    <li  className="hover:underline cursor-pointer">
                        <Link href={"/about"}>About</Link>
                    </li>
                    <li className="hover:underline cursor-pointer">
                        <Link href={"/login"}>Login</Link>
                    </li>
                    <li className="hover:underline cursor-pointer">
                        <Link href={"/signup"}>Sign-Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;