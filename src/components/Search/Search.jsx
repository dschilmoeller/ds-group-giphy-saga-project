import { useDispatch } from "react-redux";
import { useState } from "react";

function Search () {
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState('')

    function searchImages (event) {
        event.preventDefault()
        console.log('inside searchImages');
        dispatch({
            type: 'SEARCH_IMAGES',
            payload: searchString
        });
    }

    function handleSearchString (event) {
        console.log('This is what I am seraching',event.target.value)
        setSearchString(event.target.value)
    }




    return (<>
    <form onSubmit={searchImages}>
        <input placeholder="Search" onChange={handleSearchString}/>
        <button type='submit'>Search</button>
    </form>
    </>)
}

export default Search;