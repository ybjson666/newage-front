import React from 'react';
import {Select, Spin} from 'antd';
import debounce from 'lodash/debounce';
import {companyList} from 'api/company';

const Option = Select.Option;

export default class CompanySelect extends React.Component {
  constructor(props) {
    super(props);
    this.fetch = debounce(this.fetch, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };
  fetch = (value) => {
    this.setState({data: [], fetching: true});
    const upData = {
      searchText: value,
      areaId: this.props.areaId,
      pageSize: 10000
    };
    if (!value) return;
    companyList(upData).then(res => {
      if (res.code === 200) {
        const data = res.data;
        this.setState({data, fetching: false});
      }
    });

  };
  handleChange = (value, option) => {
    if ('onChange' in this.props) {
      this.props.onChange(value, option);
    }
    if (this && this.setState) {
      this.setState({
        value: value || [],
        data: [],
        fetching: false,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.organizationValue = nextProps.organizationValue || '';
    if (this.organizationValue) {
      this.setValue(this.organizationValue);
      this.organizationValue = '';
    }
  }

  setValue = (values) => {
    const nowValue = values.map(item => ({key:item.id,label:item.name}));
      this.setState({
        data: values,
        fetching: false,
        value:nowValue
      });
  };

  componentWillMount() {
    if (this.props.organizationValue) {
      this.setValue(this.props.organizationValue);
    }
  }

  render() {
    const {fetching, data, value} = this.state;
    return (
      <Select
        mode={'multiple'}
        value={value}
        labelInValue={true}
        placeholder="请输入查找"
        notFoundContent={fetching ? <Spin size="small"/> : null}
        filterOption={false}
        onSearch={this.fetch}
        onSelect={this.select}
        onChange={this.handleChange}
        style={{width: '100%'}}
      >
        {data.map(d => <Option key={d.id}>{d.name}</Option>)}
      </Select>
    );
  }
}
