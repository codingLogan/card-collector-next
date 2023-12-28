import { Card } from "../types";

export default function CardComponent({card, options = {useName: true}}: {card: Card, options?: { useName: boolean}}) {

    function cardDisplayName(card: Card) {
        return `${card.name} (${card.id.split('-')[1]})`
    }

    return (
        <div
            key={card.id}
            style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: '100%'
            }}
        >
            <span
                className="hover:bg-gray-300"
                style={{
                    width: "100%",
                    padding: "16px",
                }}
            >
                {options.useName && <h2 style={{textAlign: "center"}}>{cardDisplayName(card)}</h2>}
                <img src={card.images.small}/>
            </span>
        </div>
    )
}