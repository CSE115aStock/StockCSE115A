import React from 'react';
import alpacaApi from '../services/polygon';

/**
 * @return {Object} JSX
 */
export class alpacasSearch extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }
  /**
   * Description: tests alpacas API
   */
  consoleDidMount() {
    const alpacaApi = alpacaApi();
    alpacaApi.quote('apple').then((response)=> {
      console.log('apple stock is worth');
      console.log(response);
    });
  }
  /**
   *
   * @return {Object} JSX
   */
  render() {
    return <h1>alpacasTest</h1>;
  }
}
