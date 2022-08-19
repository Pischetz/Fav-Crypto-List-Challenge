import Card from "components/Card/Card";

export default function CardHolder({cryptoList, chain}){
    return (
        <div>
            {cryptoList.legth? cryptoList.map(crypto => <Card coin={crypto} chain={chain} key={crypto.ticker}/>) : null}
        </div>
    )
}