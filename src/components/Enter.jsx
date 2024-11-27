import React from "react"
import Result from "./Result"
import { useState } from "react"
const Enter = ({ textInput }) => {
    const [payload,setPayload] = useState("")
    const handleEnter = async () => {

        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${textInput}`);
        const respObj = await response.json();
        setPayload(respObj)
    }
    return (
        <div>
            <button onClick={handleEnter}>Enter</button>
            <Result payload={payload} />
        </div>
    )
}
export default Enter