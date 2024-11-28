import Enter from "./Enter"
import React from "react"
import { useState } from "react"

const Search = () => {
    const [textInput, setTextInput] = useState("") //yooo this sucks the value get updted after 1 second ???
    return (
        <div>
            <input type="text" name="" id="" onChange={(e) => setTextInput(e.target.value)} /> { //here we are storing the value of the text input by updating onChange so that every time the user writes somthing the value will be updated    
            }
            
            <Enter textInput={textInput} />
        </div>
    )
}
export default Search