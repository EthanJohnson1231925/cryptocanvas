import React from 'react'
import Countdown from 'react-countdown-now'
import Moment from 'react-moment'

class BiddingTimeLeft extends React.PureComponent {
  timer = null

  componentDidMount () {
    this.setState({
      secondsLeft: (this.props.biddingFinishTime * 1000 - Date.now()) / 1000,
    })

    this.startTimer()
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const secondsLeft = this.state.secondsLeft - 1
      if (secondsLeft >= 0) {
        this.setState({ secondsLeft })
      }
    }, 1000)
  }

  render () {
    return (
      <div>
        <h2><b>Bidding Time Left</b></h2>
        {this.props.biddingFinishTime &&
        <div>
          <h2><Countdown date={this.props.biddingFinishTime * 1000} /></h2>
          <p><Moment date={new Date(this.props.biddingFinishTime * 1000)} format="dddd, MMMM Do YYYY, h:mm:ss a"/></p>
        </div>
        }

        {!this.props.biddingFinishTime &&
        <p>Bidding is open to anyone now. After the first bid is placed, bidding will remain available for the next 48
          hours.</p>
        }
      </div>
    )
  }
}

BiddingTimeLeft.propTypes = {}
BiddingTimeLeft.defaultProps = {}

export default BiddingTimeLeft
