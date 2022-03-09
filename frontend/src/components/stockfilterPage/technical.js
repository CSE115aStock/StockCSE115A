import React from 'react';
/**
 *
 * @return {Object} JSX
 */
export function TechnicalPatterns() {
  return (
    <div className="content">
      <div className="form">
        <div className="form-group">
          <label htmlFor="Stock">Stock names</label>
          <input type="text" name="Stock" placeholder="stock"
            onChange={(event) =>
              setUsername(event.target.value)}/>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn"
          onClick={async () => {
            fetch('/recomend/recomendStocksTechnical', {
              method: 'POST',
              body: JSON.stringify({
                'pattern': 'CDLENGULFING',
                'sylmbols': ['amzn'],
              }),
            } );
          }}>
                    Recomend
        </button>
      </div>
    </div>
  );
}
