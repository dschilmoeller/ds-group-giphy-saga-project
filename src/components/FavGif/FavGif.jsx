import React from "react"

function FavGif(props) {
    return (<><li>
        <iframe src={props.favGif.src} />
    </li>
    </>)
}

export default FavGif;