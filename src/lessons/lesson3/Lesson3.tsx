import React, {useState} from 'react';
import API from './API';
import './lesson_3';

type SearchResultType = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

const Lesson3 = () => {
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState<SearchResultType[] | string>([]);
    const [searchNameByType, setSearchNameByType] = useState('');
    const [searchResultByType, setSearchResultByType] = useState<SearchResultType[] | string>([]);

    const searchFilm = () => {
        API.searchFilmsByTitle(searchName)
            .then(data => {
                if(data.Response === "True") {
                    setSearchResult(data.Search)
                    console.log(data)
                } else {
                    setSearchResult(data.Error)
                    console.log(data)
                }
            })
    };

    const searchByType = (e: React.MouseEvent<HTMLButtonElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        API.searchFilmsByType(searchNameByType, type)
            .then(data => {
                if(data.Response === "True") {
                    setSearchResultByType(data.Search)
                    console.log(data)
                } else {
                    setSearchResultByType(data.Error)
                    console.log(data)
                }
            })
    }

    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3><p>Search by name:</p></h3>
                <input type="text" value={searchName} onChange={(e) => setSearchName(e.currentTarget.value)}/>
                <button onClick={searchFilm}>Search</button>
                <div>
                    {Array.isArray(searchResult) ? searchResult.map(result => `${result.Title}, `) : searchResult}
                </div>
            </div>

            <div>
                <h3><p>Search by type:</p></h3>
                <input type="text" value={searchNameByType}
                       onChange={(e) => setSearchNameByType(e.currentTarget.value)}/>
                <button onClick={searchByType} data-t='movie'>Movie</button>
                <button onClick={searchByType} data-t='series'>Series</button>
                <div>
                    {Array.isArray(searchResultByType) ? searchResultByType.map(result => `${result.Title}, `) : searchResultByType}
                </div>
            </div>
        </div>
    );
}
export default Lesson3;