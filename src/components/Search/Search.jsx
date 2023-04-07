import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
        setSearchString('')
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
                    <TextField id="outlined-basic" label='search' variant="outlined" onChange={handleSearchString} value={searchString}/>
                    <Button type='submit' style={{'backgroundColor': 'aquamarine'}}>Search</Button>
                </form>
            </div>
        )
    } else {
        return (
            <>
                <div>
                    <form onSubmit={searchImages}>
                        <TextField id="outlined-basic" label='search' variant="outlined" onChange={handleSearchString} value={searchString}/>
                        <Button type='submit' style={{'backgroundColor': 'aquamarine'}}>Search</Button>
                    </form>
                </div>
                {console.log('results is:', results)}
                <Card sx={{ minWidth: 275 }} style={{'backgroundColor': 'transparent'}}>
                    <div className="gifWrapper">
                        {results.map((image, i, x) => {
                            //console.log('Here is our map', image)
                            return (<>
                            <CardContent>
                            <div className="singleGif">
                                <iframe src={image.embed_url} />
                                <CardActions style={{'backgroundColor': 'skyblue'}}>
                                    <Button variant="contained" color='success' size="small" id={i} onClick={addFavorite}>Favorite</Button>
                                </CardActions>
                            </div>
                            </CardContent>
                            </> )
                    })
                    }</div>
            </Card>
            </>)
    }
}

export default Search;