import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { message } from 'antd';
import 'react-quill/dist/quill.snow.css';
import '../../components/quill/index.less';
import { uploadCustomImg } from '../../api/volunteerList';


const fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'sans-serif'];
const Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': fonts }],
  [{ 'align': [] }],
  ['link', 'image'],
  ['clean']                                         // remove formatting button
];

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contentHtml: props.value || props.defaultValue || '' };
    this.handleChange = this.handleChange.bind(this);
    this.imgPrev = sessionStorage.getItem('imgPrev');
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in this.props) {
      this.setState({ contentHtml: nextProps.value || '' });
    }
  }

  handleChange(html, delta, source, editor) {
    const nowContents = editor.getContents();
    const contents = nowContents.ops || '';
    const prevHtml = this.state.contentHtml;
    let testHtml = html;
    testHtml = testHtml.replace(/<p>/g, '');
    testHtml = testHtml.replace(/<\/p>/g, '');
    testHtml = testHtml.replace(/<br>/g, '');
    if (!testHtml.trim()) {
      html = '';
    }

    let num = 0;
    let refusStatus = false;
    if (contents && Array.isArray(contents)) {
      contents.map(ele => {
        if (typeof ele.insert === 'string') {
          // console.log(ele.insert.length);
          num += ele.insert.length;
          if ('limit' in this.props) {
            // console.log(num);
            if (num > this.props.limit) {
              refusStatus = true;
            }
          }
        }
      });
    }

    if (refusStatus && !this.props.disabled) {
      message.error(`字数不能大于${this.props.limit-1}个字!`);
      if ('onChange' in this.props) {
        this.props.onChange(prevHtml || false);
      }
      this.setState({
        contentHtml: prevHtml
      });
    } else {
      if ('onChange' in this.props) {
        this.props.onChange(html);
      }
      this.setState({
        contentHtml: html
      });
    }
  }

  imageHandler = () => {
    const instance = this;
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '*');
    input.click();
    if (!this.quill.editingArea.getSelection) {
      this.quill.editingArea.focus();
    }
    input.onchange = () => {
      const file = input.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const url = reader.result;
        uploadCustomImg({ file: url }).then(res => {
          if (res && res.success) {
            let quill = instance.quill.getEditor();//获取到编辑器本身
            const cursorPosition = quill.getSelection().index;//获取当前光标位置
            quill.insertEmbed(cursorPosition, 'image', instance.imgPrev + res.data, Quill.sources.USER);//插入图片
            quill.setSelection(cursorPosition + 1);
          } else {
            let quill = instance.quill.getEditor();//获取到编辑器本身
            const cursorPosition = quill.getSelection().index;//获取当前光标位置
            quill.insertEmbed(cursorPosition, 'image', url, Quill.sources.USER);//插入图片
            quill.setSelection(cursorPosition + 1);
          }
          this.imgupload = true;
        });

      };
    };
  };
  modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: () => {
          if (!this.props.disabled) {
            this.imageHandler();
          }
        }
      },
      imageDrop: true
    }
  };
  formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'code-block', 'background', 'align',
    'link', 'image', 'color'
  ];

  render() {
    return (
      <div className={`quill-editor ${this.props.className}`}>
        {/*<CustomToolbar/>*/}
        <ReactQuill
          ref={node => {
            if (!this.quill && node) {
              this.quill = node;
            }
          }}
          value={this.state.contentHtml}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          readOnly={this.props.disabled}
          modules={this.modules}
          formats={this.formats}
        />
      </div>
    );
  }
}

export default Editor;
