import React, { Component } from 'react';
import { Row, Col, TimePicker } from 'antd';
import moment from 'moment';


export default class TimePickerRange extends Component {
  constructor(props) {
    super(props);
    /*定义时间数组*/
    this.state = {
      value: this.props.value
    };
    this.Hours = Array.from(Array(24), (v, k) => k);
    this.Minutes = Array.from(Array(60), (v, k) => k);
    this.Seconds = Array.from(Array(60), (v, k) => k);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value=[] } = nextProps;
    // 当传入的type发生变化的时候，更新state

      return {
        value
      };

  }


  triggerChange = value => {
    if ('onChange' in this.props) {
      this.props.onChange(value);
    }
  };

  /*结束时间控制-hour*/
  disEndHouse = () => {
    let startTime = this.state.value&&this.state.value[0];
    if (startTime) {
      startTime = moment(startTime);
      let h = startTime.hour();
      return this.Hours.slice(0, h);
    }
    return [0, 23];
  };

  /*结束时间控制-minute）*/
  disEndMinute = h => {
    let startTime = this.state.value&&this.state.value[0];

    if (startTime) {
      startTime = moment(startTime);

      if (h > startTime.hour()) return [];
      let m = startTime.minute();
      return this.Minutes.slice(0, m);
    }
    return [0, 59];
  };

  /*结束时间控制-second*/
  disEndSeconds = (h, m) => {
    let startTime = this.state.value&&this.state.value[0];

    if (startTime) {
      startTime = moment(startTime);
      if (h > startTime.hour()) return [];
      if (m > startTime.minute()) return [];
      let s = startTime.second();
      return this.Seconds.slice(0, s + 1);
    }
    return [0, 59];
  };

  /*开始时间控制-hour*/
  disStartHouse = () => {
    let { endTime } = this.state;
    endTime = moment(endTime);
    if (endTime) {
      let h = endTime.hour();
      return this.Hours.slice(h, this.Hours.length - 1);
    }
    return [0, 24];
  };

  /*开始时间控制-minute*/
  disStartMinute = h => {
    let { endTime } = this.state;
    endTime = moment(endTime);
    if (endTime) {
      if (h < endTime.hour()) return [];
      let m = endTime.minute();
      return this.Minutes.slice(m, this.Minutes.length - 1);
    }
    return [];
  };

  /*开始时间控制-second*/
  disStartSeconds = (h, m) => {
    let { endTime } = this.state;
    endTime = moment(endTime);
    if (endTime) {
      if (h < endTime.hour()) return [];
      if (m < endTime.minute()) return [];
      let s = endTime.second();
      return this.Seconds.slice(s, this.Seconds.length - 1);
    }
    return [];
  };
  setStartTime = (value) => {
    const useValue = this.state.value || [];
    useValue[0] = value;
    this.setState({ value: useValue }, () => {
      this.triggerChange(this.state.value);
    });
  };
  setEndTime = (value) => {
    const useValue = this.state.value || [];
    useValue[1] = value;
    this.setState({ value: useValue }, () => {
      this.triggerChange(this.state.value);
    });
  };

  render() {
    const {
      prefixCls,
      className,
      style,
      onChange,
      value,
      disabled,
      ...rest
    } = this.props;

    return (
      <div style={{ display: 'inline-block' }}>
        <TimePicker
          allowClear={false}
          disabled={disabled}
          key={'start'}
          defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
          suffixIcon=''
          onChange={value => {
            this.setStartTime(value);
          }}
          onOpenChange={(status)=>{
            if(!status){
              if('onLastChange' in this.props){
                this.props.onLastChange(this.state.value);
              }
            }}
            }

          value={value && value[0] ? value[0] : undefined}
        />
        <span style={{ margin: '0 10px' }}>至</span>
        <TimePicker
          allowClear={true}
          key={'end'}
          disabled={disabled}
          onChange={value => {
            if (!value) {
              this.setState({ value: '' });
              if ('onChange' in this.props) {
                this.props.onChange([]);
              }
              return;
            }
            this.setEndTime(value);
          }}
          defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
          value={value && value[1] ? value[1] : undefined}
          disabledHours={this.disEndHouse}
          disabledMinutes={this.disEndMinute}
          onOpenChange={(status)=>{
            if(!status){
              if('onLastChange' in this.props){
                this.props.onLastChange(this.state.value);
              }
            }}
          }
          disabledSeconds={this.disEndSeconds}
        />
      </div>
    );
  }
};


