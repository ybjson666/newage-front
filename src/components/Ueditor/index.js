import React from 'react';

class UeditorOut extends React.Component {
  static defaultProps = {
    config: {}
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initEditor();
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    window.UE.delEditor(this.props.id);
  }

  initEditor() {
    const { id, config } = this.props;
    const ueEditor = window.UE.getEditor(this.props.id, config);
    const self = this;

    ueEditor.ready((ueditor) => {
      if (!ueditor) {
        window.UE.delEditor(id);
        self.initEditor();
      }
    });
  }

  render() {
    return (
      <div id={this.props.id} name="content" type="text/plain"/>
    );
  }
}

export default UeditorOut;
