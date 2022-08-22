import Image from "next/image";
import Link from "next/link";

export default function Card({coin, chain}){
    

    return(
        <Link href={`/info${chain}/${coin.ticker}`}>
        <div className="h-[35px] flex items-center">
            <Image src={coin.logo} width='20px' height='20px' className="rounded-full" />
            {coin.coin}
        </div>
        </Link>
    )
}