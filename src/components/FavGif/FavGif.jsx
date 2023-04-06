import React from "react"
import { useDispatch, useSelector } from 'react-redux';


function FavGif(props) {
    // declare disp
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
        <button>Set Category</button>
    </div>
    </>)
}

export default FavGif;