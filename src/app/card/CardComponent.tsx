import { useState } from "react";
import { collectCard, removeCard } from "../saver";
import { Card } from "../types";

export default function CardComponent({card, owned, options = {useName: true}}:
    {
        card: Card,
        cardClickHandler?: (event: any) => void,
        owned?: boolean,
        options?: { useName: boolean }
    }) {

    const [cardIsOwned, setOwned] = useState(owned)

    function cardDisplayName(card: Card) {
        return `${card.name} (${card.id.split('-')[1]})`
    }

    function cardClickHandler(event: {target: {checked: boolean, name: string}}) {
        if ( event.target.checked === true) {
            // Add to collection if the box has been checked
            collectCard(event.target.name)
        } else {
            // Remove from the collection if the box was unchecked
            removeCard(event.target.name)
        }

        setOwned(!cardIsOwned)
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
                    checked={cardIsOwned}
                />
                {options.useName && <h2 style={{textAlign: "center"}}>{cardDisplayName(card)}</h2>}
                <img src={card.images.small}/>
            </span>
        </div>
    )
}