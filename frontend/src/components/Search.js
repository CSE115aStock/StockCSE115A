import React from 'react';
import SearchContext from './SearchContext';

function Search() {
    return (
        <SearchContext.Consumer>
          {({searchValue}) => (
            <div>
                You searched: {searchValue}
            </div>
          )}
        </SearchContext.Consumer>
    )

}

export default Search;