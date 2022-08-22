import Image from "next/image";
import Link from "next/link";

export default function Card({coin, chain}){
    

    return(
        <Link href={`/info${chain}/${coin.ticker}`}>
        <a href={`/info${chain}/${coin.ticker}`}>
        <div className="h-[35px] flex items-center hover:bg-gray-200 hover:text-gray-900">
            <Image src={coin.logo} width='20px' height='20px' className="rounded-full" />
            <span className="ml-2">{coin.coin}</span>
        </div>
        </a>
        </Link>
    )
}