import Card from "components/Card/Card";

export default function CardHolder({ cryptoList, chain, search }) {
    return (
        <div className="h-auto overflow-auto max-h-[200px] w-full">
            {cryptoList.length ? cryptoList.map(crypto => {
                if(crypto.coin?.toUpperCase().includes(search.toUpperCase())){
                    return <Card coin={crypto} chain={chain} key={crypto.ticker} />
                }
            }) : null}
        </div>
    )
}