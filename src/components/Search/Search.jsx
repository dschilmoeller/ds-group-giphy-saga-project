function Search () {

    function searchImages () {
        console.log('inside searchImages')
    }



    return (<>
    <form>
        <input placeholder="Search"/>
        <button onClick={searchImages}>Search</button>
    </form>
    </>)
}

export default Search;