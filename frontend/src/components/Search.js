import React from 'react';
import SearchContext from './SearchContext';

function Search() {
    return (
        <SearchContext.Consumer>
          {({finalSearch}) => (
            <div>
                You searched: {finalSearch}
            </div>
          )}
        </SearchContext.Consumer>
    )

}

export default Search;