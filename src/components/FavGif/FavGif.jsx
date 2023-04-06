import React from "react"

function FavGif(props) {
    return (<><li>
        <img src={props.favGif.src} />
    </li>
    </>)
}

export default FavGif;