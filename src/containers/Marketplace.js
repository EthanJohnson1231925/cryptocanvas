import React, { Component } from 'react'
import { Divider, Row } from 'antd'
import withEvents from '../hoc/withEvents'
import withWeb3 from '../hoc/withWeb3'
import ActiveCanvases from './Homepage/ActiveCanvases'
import FinishedCanvases from './Homepage/FinishedCanvases'
import { CANVAS_STATES } from '../models/CanvasState'
import BiddingCanvases from './Homepage/BiddingCanvases'

class Marketplace extends Component {
  state = {
    biddingCanvasIds: [],
    completedCanvasIds: [],
  }

  componentDidMount () {
    this.getActiveCanvasIds()
      .then(activeCanvasIds => this.getFinishedCanvasIds(activeCanvasIds))

    if (this.props.eventsSupported) {
      this.props.getBlockNumber().then(this.watchForChanges)
    }
  }

  watchForChanges = (blockNumber) => {
    const canvasCreatedEvent = this.props.Contract.CanvasCreatedEvent({}, { fromBlock: blockNumber, toBlock: 'latest' })

    // watch for changes
    canvasCreatedEvent.watch(() => {
      console.log('[EVENT] New canvas created')
      this.getActiveCanvasIds()
        .then(activeCanvasIds => this.getFinishedCanvasIds(activeCanvasIds))
    })

    this.props.events.push(canvasCreatedEvent)
  }

  getActiveCanvasIds = () => this.props.Contract.getActiveCanvasIds()

  getCanvasState = (canvasId) => this.props.Contract.getCanvasState(canvasId)

  getFinishedCanvasIds = (activeCanvasIds) => {
    this.props.Contract.getCanvasCount()
      .then((canvasCount) => {
        const finishedCanvasIds = Array.from(new Array(canvasCount), (val, index) => index)
          .filter(id => !activeCanvasIds.includes(id))
        console.log('Finished canvases: ' + finishedCanvasIds)

        const pCanvasStates = finishedCanvasIds.map(canvasId => this.getCanvasState(canvasId))

        Promise.all(pCanvasStates).then((canvasStates) => {
          const biddingCanvasIds = canvasStates.filter(canvasState => canvasState.state === CANVAS_STATES.bidding)
            .map(canvasState => canvasState.canvasId)
          const completedCanvasIds = canvasStates.filter(canvasState => canvasState.state === CANVAS_STATES.completed)
            .map(canvasState => canvasState.canvasId)
          console.log('Bidding canvases: ' + biddingCanvasIds)
          console.log('Completed canvases: ' + completedCanvasIds)
          this.setState({ biddingCanvasIds, completedCanvasIds })
        })
      })
  }

  render () {
    return (
      <Row className="container">
        <BiddingCanvases canvasIds={this.state.biddingCanvasIds} />
        <Divider />
        <FinishedCanvases canvasIds={this.state.completedCanvasIds} />
      </Row>
    )
  }
}

Marketplace.propTypes = {}
Marketplace.defaultProps = {}

export default withEvents(withWeb3(Marketplace))