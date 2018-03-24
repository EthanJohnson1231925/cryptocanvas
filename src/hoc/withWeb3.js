import React from 'react'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import ABI from '../helpers/ABI.json'
import { ContractModel } from '../models/ContractModel'

const Web3 = window.Web3

const withWeb3 = (WrappedComponent) => {
  class withWeb3 extends React.Component {
    constructor(props) {
      super(props)

      // TODO keep web3 and contract in Redux?

      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
      }

      this.web3 = window.web3
      // console.log(window.web3)

      // Set default account
      window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
      // console.log('defaultAccount', window.web3.eth.defaultAccount)

      const ContractInstance = window.web3.eth.contract(ABI)
      this.Contract = new ContractModel(ContractInstance.at('0x13274fe19c0178208bcbee397af8167a7be27f6f'))
      // console.log(this.Contract)

      // watch for changes
      // this.Contract.allEvents().watch(function(error, event){
      //   console.log('[EVENT] all events')
      //   if (!error)
      //     console.log(event);
      // });
    }

    render () {
      const {
        ...passThroughProps
      } = this.props

      const injectedProps = {
        web3: this.web3,
        Contract: this.Contract
      };

      const props = Object.assign(
        {},
        passThroughProps,
        injectedProps
      )

      return <WrappedComponent {...props} />
    }
  }

  withWeb3.displayName = `withWeb3(${getComponentDisplayName(WrappedComponent)})`

  return withWeb3
}

export default withWeb3
