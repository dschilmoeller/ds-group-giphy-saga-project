import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';


function FavGif(props) {
    const [category, setCategory] = useState(0);
    const dispatch = useDispatch();
    const handleSelect = event => {
        setCategory(event.target.value);
        console.log('event value:', event.target.value);
        
        dispatch({
            type: 'UPDATE_FAV_GIF',
            payload: {id: props.favGif.id, category_id: event.target.value}
        })
    }
    return (<><div className="gifContainer">
        <img src={props.favGif.src} />
        <h3>{props.favGif.name}</h3>
        <select name='Category' value={category} onChange= {handleSelect}>
            <option defaultValue>Category</option>
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