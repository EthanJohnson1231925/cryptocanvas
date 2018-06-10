// @flow
import * as React from 'react'
import { Button, Col, Icon, Row } from 'antd'
import Moment from 'react-moment'
import './styles/BetaInfo.css'
import pixelBg from '../../assets/images/pixels.png'
import { CountdownCounter } from '../../hoc/renderProps/CountdownCounter'
import { Countdown } from '../../components/Small/Countdown'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

const LIVE_START_DATE = 1530446400000

const BetaInfo = () => {
  return (
    <div className="BetaInfo" style={{ backgroundImage: `url(${pixelBg})` }}>
      <Row type="flex" align="middle" className="BetaInfo__content container">
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <p className="BetaInfo__Header">Welcome to</p>
          <p className="BetaInfo__Header"><b>CryptoCanvas BETA</b></p>
          <p className="BetaInfo__text">This is a completely FREE version running on Rinkeby Test Network.</p>
          <p className="BetaInfo__text">
            <Link to={URLHelper.getStarted}>
              <Button type="primary" size="large" className="Intro__button">
                Get started <Icon type="arrow-right" />
              </Button>
            </Link>
          </p>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }} className="text-center">
          <h2>Live version starts in:</h2>
          <CountdownCounter
            date={new Date(LIVE_START_DATE)}
            render={(state) => <Countdown {...state} />}
          />
          <span className="BetaInfo__CountdownDate">
          <Moment date={new Date(LIVE_START_DATE)} format="dddd, MMMM Do YYYY, h:mm a" /> UTC
        </span>
        </Col>
      </Row>
    </div>
  )
}

BetaInfo.defaultProps = {}

export default BetaInfo
