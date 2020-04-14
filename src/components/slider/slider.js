import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './slider-components/components.js' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
  padding: '10px 0px 0px 0px'
}

class RangeSlider extends Component {
  state = {
    domain: [this.props.ops.min, this.props.ops.max],
    values: this.props.ops.defaultValues,
    update: this.props.ops.defaultValues,
    reversed: false,
  }

  onUpdate = update => {
    this.props.onUpdate(update);
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  setDomain = domain => {
    this.setState({ domain })
  }

  toggleReverse = () => {
    this.setState(prev => ({ reversed: !prev.reversed }))
  }

  render() {
    const {
      state: { domain, values, update, reversed },
    } = this

    return (
      <div style={{ height: '3rem', width: '100%' }}>
        {/* <button onClick={() => this.setDomain([100, 400])}>
          SET DOMAIN [100, 400]
        </button>
        <button onClick={() => this.setDomain([300, 600])}>
          SET DOMAIN [300, 600]
        </button>
        <button onClick={() => this.toggleReverse()}>
          {reversed ? 'DISPLAY LOW TO HIGH' : 'DISPLAY HIGH TO LOW'}
        </button> */}
        <Slider
          mode={this.props.ops.mode}
          step={this.props.ops.step}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={this.props.ops.ticks}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default RangeSlider;