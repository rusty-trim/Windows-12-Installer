import { useState } from "react";

export default function ProductKey({ goToOsSelection, validateKey }: { goToOsSelection: () => void, validateKey: (key: string[]) => void }) {
    
    const [value, setValue] = useState(["", "", "", "", ""]);

    const nextInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const maxLength = target.maxLength;
        const currentLength = target.value.length;

        target.value = target.value.toUpperCase();

        if (event.key == "Backspace") {
            if (currentLength === 0) {
                (target.previousSibling as HTMLElement)?.focus();
            }
        } else if (currentLength === maxLength) {
            (target.nextSibling as HTMLElement)?.focus();
        }
    }

    const handleInput = (event: React.FormEvent<HTMLInputElement>, nextInput: (event: React.KeyboardEvent<HTMLInputElement>) => void) => {
        const target = event.target as HTMLInputElement;
        const validInput = target.value.replace(/[^0-9a-zA-Z]/g, ""); // Remove invalid characters
        if (target.value !== validInput) {
            target.value = validInput; // Update the value to only valid characters
        }
        nextInput(event as unknown as React.KeyboardEvent<HTMLInputElement>); // Call the nextInput function

        const index = Array.from((target.parentElement as HTMLElement).children).indexOf(target);
        const newValue = value;
        setValue([...newValue.slice(0, index), target.value, ...newValue.slice(index + 1, newValue.length)]);
    }

    return (
        <div className="productkey-box">
            <h2>Activate Windows</h2>
            <p>If this is the first time you're installing Windows on this PC (or you're installing a different edition), you need to enter a valid Windows product key. Your product key should be in the confirmation email you recieved after buying a digital copy of Windows or on a label inside the box that Windows came in.</p>
            <p>The product key looks like this: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</p>
            <p style={{ marginBottom: "0px !important" }}>If you're reinstalling Windows, select I don't have a product key. Your copy of Windows will be automatically activated later.</p>
            <div className="product-key-group">
                <input type="text" maxLength={5} className="product-key" onKeyDown={nextInput} onInput={(event) => handleInput(event, nextInput)} />
                <input type="text" maxLength={5} className="product-key" onKeyDown={nextInput} onInput={(event) => handleInput(event, nextInput)} />
                <input type="text" maxLength={5} className="product-key" onKeyDown={nextInput} onInput={(event) => handleInput(event, nextInput)} />
                <input type="text" maxLength={5} className="product-key" onKeyDown={nextInput} onInput={(event) => handleInput(event, nextInput)} />
                <input type="text" maxLength={5} className="product-key" onKeyDown={nextInput} onInput={(event) => handleInput(event, nextInput)} />
            </div>
            <div style={{ position: "relative", width: "100%" }}>
                <div style={{ position: "absolute", top: -30, display: "flex", justifyContent: "end", width: "100%", flexDirection: "row", alignItems: "center", gap: "30px" }}>
                    <p style={{ cursor: "pointer", color: "#d69dff" }} onClick={() => goToOsSelection()}>I don't have a product key</p>
                    <button onClick={() => validateKey(value)}>Next</button>
                </div>
            </div>
        </div >
    )
}