import React, { useEffect } from "react";
// do we need to specifically import useEffect when it is already part of React which we have imported all of? 
import { useDispatch, useSelector } from "react-redux";

function Favorites() {
    // useEffect for initial GET with dispatch inside to trigger Saga GET which will pass data to the reducer 
    // useSelector to access data from store/reducer 
    render(<><h3>Favorited GIFs</h3>
        {/* .map favorites */}
    </>)
}

export default Favorites;