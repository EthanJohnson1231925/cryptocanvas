// @flow
import * as React from 'react'
import './styles/CanvasPixelPopup.css'
import { Card } from 'antd'
import type { PixelIndex } from '../../types/PixelIndex'

type Props = {
  pixelPopup: PixelIndex,
  color: number,
  pixelSize: number,
  onClose: () => void,
}

const POPUP_WIDTH = 300

class CanvasPixelPopup extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    if (!this.props.pixelPopup) {
      return null
    }

    const left = (this.props.pixelPopup.x * this.props.pixelSize) - (POPUP_WIDTH / 2) + (this.props.pixelSize / 2)
    const top = (this.props.pixelPopup.y * this.props.pixelSize)

    return (
      <div className="CanvasPixelPopup" style={{ left, top }}>
        <Card className="CanvasPixelPopup__card"
              title={'Pixel #' + this.props.pixelPopup.id}
              extra={<a onClick={this.props.onClose}>close</a>} style={{ width: 300 }}>
          <h4>Color: #{this.props.color}</h4>
          <a href="#">copy color</a>
          <h4>Painter:</h4>
          <span>Loading...</span>
        </Card>
      </div>
    )
  }
}

export { CanvasPixelPopup }
