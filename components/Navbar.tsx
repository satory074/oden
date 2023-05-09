import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <span>Home</span>
                    </Link>
                </li>
                {/* Add more links as necessary */}
            </ul>
        </nav>
    );
}
