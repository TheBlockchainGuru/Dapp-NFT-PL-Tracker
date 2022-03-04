import React, { Component } from 'react'
import { Button } from "react-bootstrap"
import './ImagePicker.css'

class ImagePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ""
    };
  }

  onChange = (e) => {
    var self = this;
    self.setState({message: ""});

    var files = e.target.files;
    if (files.length >= 1) {
      var file = files[0];
      var supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (supportedTypes.includes(file.type)) {
        if (file.size < 10400000) {
          // get data and update photo
          var reader  = new FileReader();
          reader.addEventListener("load", function () {
            self.props.onChange(props.name, reader.result);
          }, false);
          reader.readAsDataURL(file);
        } else {
          self.setState({message: "Photo file size too large."});
        }
      } else {
        self.setState({message: "Unsupported file type."});
      }
    }
  };

  onButtonClick = (e) => {
    e.preventDefault();
    this.refs.fileUploader.click();
  };

  onRemoveButtonClick = (e) => {
    console.log("rem");
    this.props.onChange(undefined, undefined);
  };

  render() {
    var imgUrl = (this.props.previewImage || '/img/header_image_picker_default.jpg' );

    return (
      <>
        { this.props.label ? (
          <b>{this.props.label}</b>
        ) : null }
        <div className="image-picker">
          <input
              type="file"
              id="file"
              ref="fileUploader"
              accept="image/*"
              style={{display: "none"}}
              onChange={this.onChange}/>
          <div className="image-picker__preview-wrapper">
            <img src={imgUrl} alt="upload preview" />
          </div>
          <div className="image-picker__button-wrapper" hidden={!this.props.previewImage}>
            <Button size="sm" variant="secondary" onClick={this.onRemoveButtonClick}>Remove Photo</Button>
          </div>
          <div className="image-picker__button-wrapper" hidden={this.props.previewImage}>
            <Button  size="sm" variant="secondary" onClick={this.onButtonClick}>Upload Photo</Button>
            <div className="image-picker__subtitle">(10mb limit)</div>
            <div className="image-picker__error-box" style={{hidden: this.state.message !== ""}}>{this.state.message}</div>
          </div>
        </div>
      </>
    );
  }
}

export default ImagePicker;