import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// put <SearchList /> inside a conditional activated by hitting the search button. Simple false->true

function Search() {
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState('')
    const results = useSelector(store => store.searchReducer)
    // console.log('results.data:', results.data.images.original.url)

    function searchImages(event) {
        event.preventDefault()
        //console.log('inside searchImages');
        dispatch({
            type: 'SEARCH_IMAGES',
            payload: searchString
        });
    }

    function addFavorite(event) {
        //console.log('inside addFavorite function')
        //console.log('here is our favorite event', event.target.id)
        let imageToFavorite = { src: results[event.target.id].embed_url }
        dispatch({
            type: 'POST_FAVORITE',
            payload: imageToFavorite
        })
    }

    function handleSearchString(event) {
        // console.log('This is what I am seraching',event.target.value)
        setSearchString(event.target.value)
    }

    if (results.data === 'null') {
        return (
            <div>
                <form onSubmit={searchImages}>
                    <input placeholder="Search" onChange={handleSearchString} />
                    <button type='submit'>Search</button>
                </form>
            </div>
        )
    } else {
        return (
            <>
                <div>
                    <form onSubmit={searchImages}>
                        <input placeholder="Search" onChange={handleSearchString} />
                        <button type='submit'>Search</button>
                    </form>
                </div>
                {console.log('results is:', results)}
                <div className="gifWrapper">
                    {results.map((image, i) => {
                        //console.log('Here is our map', image)
                        return (
                            <div className="singleGif" key={i}>
                                <iframe src={image.embed_url} />
                                <div className="favoriteBtn">
                                    <button id={i} onClick={addFavorite}>Favorite</button>
                                </div>
                            </div>
                        )
                    })
                    }</div>
            </>)
    }
}

export default Search;