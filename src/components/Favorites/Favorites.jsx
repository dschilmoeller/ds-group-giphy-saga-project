import React, { useEffect } from "react";
// do we need to specifically import useEffect when it is already part of React which we have imported all of? 
import { useDispatch, useSelector } from "react-redux";

function Favorites() {
    const dispatch = useDispatch()
    // useEffect for initial GET with dispatch inside to trigger Saga GET which will pass data to the reducer 
    useEffect(() => { dispatch({ type: "GET_FAVORITES" }) })
    // useSelector to access data from store/reducer 
    const favoriteList = useSelector((store) => { store.favoriteList })

    render(<><h3>Favorited GIFs</h3>
        {/* .map favorites */}
        <ul>{favoriteList.map((favGif) => {
            return <FavGif key={favGif.id} favGif={favGif} />
        })}</ul>
    </>)
}

export default Favorites;