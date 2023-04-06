import React from "react"

function FavGif(props) {
    return (<><div className="gifContainer">
        <img src={props.favGif.src} />
        <select>
            <option disabled selected>Category</option>
            <option value="1">Funny</option>
            <option value="2">Cohort</option>
            <option value="3">Cartoon</option>
            <option value="4">NSFW</option>
            <option value="5">Meme</option>
            
        </select>
    </div>
    </>)
}

export default FavGif;