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
        console.log('inside searchImages');
        dispatch({
            type: 'SEARCH_IMAGES',
            payload: searchString
        });
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
        { console.log('results is:', results) }
        {results.map((image, i) => {
                console.log('Here is our map', image)
                return (
                    <div key={i}>
                        <iframe src={image.embed_url} />
                    </div>
                )
            })
        }
   </> )}
}

    export default Search;