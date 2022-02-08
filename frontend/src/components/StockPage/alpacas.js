import React from 'react';
import alpacaApi from '../services/polygon'

export class alpacasSearch extends React.Component {
    constructor(props) {
        super(props)
    }
    consoleDidMount(){
      const alpacaApi = alpacaApi()
      alpacaApi.quote("apple").then((response)=> {
        console.log("apple stock is worth")
        console.log(response)

      })
    }
    render() {
      return <h1>alpacasTest</h1>;
    }
}
