import React from 'react';
import PropTypes from 'prop-types';
import ObjectPath from 'object-path'

import videojs from 'video.js'

const DEFAULT_STATE = {
  options: {
    controls: true,
    controlBar: { 
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true,
      subtitlesButton: false,
    },
    techOrder: [
      'html5',
    ],
    autoplay: false, 
    muted: false,
    loop: false,
    preload: 'none',
    aspectRatio: '16:9',
    fluid: true,
    subtitles: [],
    defaultSubtitle: ''
  },
  playInline: true,
  crossOrigin: ''
}

const DEFAULT_EVENTS = [
  'loadeddata',
  'canplay',
  'canplaythrough',
  'play',
  'pause',
  'waiting',
  'playing',
  'ended',
  'error',
];

class VideoPlayer extends React.Component {
  static defaultProps = {
    options: {}
  }

  video = null
  state = DEFAULT_STATE

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.player && this.props.options !== prevProps.options) {
      this.resetUrl();
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  resetUrl() {
    const sources = ObjectPath(this.props).get('options.sources') || []

    sources[0] && this.player.src(sources[0].src);
    this.player.poster(this.props.options.poster);
  }

  initialize() {
    //
    if (this.state.playInline) {
      this.video.setAttribute('webkit-playsinline', true);
      this.video.setAttribute('playsInline', true);
      this.video.setAttribute('x5-playsinline', true);
      this.video.setAttribute('x5-video-player-type', 'h5');
      this.video.setAttribute('x5-video-player-fullscreen', false);
    }

    // 
    if (this.state.crossOrigin !== '') {
      this.video.crossOrigin = this.state.crossOrigin;
      this.video.setAttribute('crossOrigin', this.state.crossOrigin);
    }

    // "VIDEOJS: ERROR: Unable to find plugin: __ob__"
    if (this.state.options.plugins) {
      this.setState((prevState) => {
        delete prevState.plugins.__ob__;
        return prevState;
      })
    }

    this.setState({
      options: {
        ...this.state.options,
        ...this.props.options,
      },
    }, () => {
      const context = this;
      this.player = videojs(this.video, this.state.options, function () {


        // events
        const events = DEFAULT_EVENTS.concat(context.props.events)

        const onEdEvents = {};
        for (let i = 0; i < events.length; i += 1) {
          if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
            (event => {
              onEdEvents[event] = null;
              this.on(event, () => {
                if (typeof context.props[event] === 'function') context.props[event](true);
              });
            })(events[i]);
          }
        }

        this.on('timeupdate', function () {
          if (typeof context.props.timeupdate === 'function') context.props.timeupdate(this.currentTime());
        });
      });
    });
  }

  render() {
    const { onRef } = this.props;

    return (
        <div className="w-100">
            <video className="video-js" ref={
            video => {
                this.video = video
                onRef && onRef(video)
            }
            }>
            </video>
        </div>
    )
  }
}

VideoPlayer.propTypes = {
  options: PropTypes.object,
  events: PropTypes.array,
  onRef: PropTypes.func,

  // events props
  loadeddata: PropTypes.func,
  canplay: PropTypes.func,
  canplaythrough: PropTypes.func,
  play: PropTypes.func,
  pause: PropTypes.func,
  waiting: PropTypes.func,
  playing: PropTypes.func,
  ended: PropTypes.func,
  error: PropTypes.func,
  timeupdate: PropTypes.func,
};

export default VideoPlayer;