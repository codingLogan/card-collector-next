import { Card } from "../types";

export default function CardComponent({card, cardClickHandler, owned, options = {useName: true}}:
    {
        card: Card,
        cardClickHandler?: (event: any) => void,
        owned?: boolean,
        options?: { useName: boolean }
    }) {

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
                width: '100%',
                
            }}
        >
            
            <span
                className="hover:bg-gray-300"
                style={{
                    width: "100%",
                    position: "relative"
                }}
            >
                <input
                    type="checkbox"
                    name={card.id}
                    onChange={cardClickHandler}
                    style={{
                        height: "32px",
                        width: "32px",
                        position: "absolute",
                        right: '4px',
                        top: options.useName ? '28px' : '4px',
                        opacity: '0.75'
                    }}
                    defaultChecked={owned}
                />
                {options.useName && <h2 style={{textAlign: "center"}}>{cardDisplayName(card)}</h2>}
                <img src={card.images.small}/>
            </span>
        </div>
    )
}