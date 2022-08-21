import Link from "next/link";

export default function Card({coin, chain}){
    

    return(
        <Link href={`/info${chain}/${coin.ticker}`}>
        <div>
            {coin.coin}
        </div>
        </Link>
    )
}