import React from 'react';
import StockViewerContext from './StockViewerContext';

function StockViewer() {
    return (
        <StockViewerContext.Consumer>
          {({finalSearch}) => (
            <div>
                Ticker: {finalSearch}
            </div>
          )}
        </StockViewerContext.Consumer>
    )

}

export default StockViewer;