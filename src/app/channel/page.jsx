import Link from "next/link"
export default function Channel() {
    return (
        <>
            <div className="flex justify-center align-center flex-wrap pt-3">
                <ul>
                    <li className="mb-3">
                        <Link className="text-white bg-black p-3 rounded inline-block" href="/channel/QWEDFDFD">Channel 01</Link>
                    </li>
                    <li className="mb-3">
                        <Link className="text-white bg-black p-3 rounded inline-block" href="/channel/VMJFYDKG">Channel 02</Link>
                    </li>
                    <li>
                        <Link className="text-white bg-black p-3 rounded inline-block" href="/channel/KGIHDNDK">Channel 03</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}