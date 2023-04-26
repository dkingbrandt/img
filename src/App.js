import React from "react";
import Avatar from 'react-avatar-edit'
class App extends React.Component {
  constructor(props) {
    super(props);
    const src = "/einshtein.jpg";
    this.state = {
      preview: null,
      defaultPreview: null,
      src,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onCropDefault = this.onCropDefault.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCloseDefault = this.onCloseDefault.bind(this);
    this.onLoadNewImage = this.onLoadNewImage.bind(this);
  }

  onCropDefault(preview) {
    this.setState({ defaultPreview: preview });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  onCloseDefault() {
    this.setState({ defaultPreview: null });
  }

  onClose() {
    this.setState({ preview: null });
  }

  onLoadNewImage() {
    const src = "/einshtein2.jpeg";
    this.setState({ src });
  }

  render() {
    return (
      <div className="container-fluid">
 
        <div className="row">
          <div className="col-2" />
          <div className="col-5">
            <Avatar
              width={390}
              height={295}
              exportSize={390}
              onCrop={this.onCropDefault}
              onClose={this.onCloseDefault}
            />
          </div>
          <div className="col-2">
           
            <img
              alt=""
              style={{ width: "150px", height: "150px" }}
              src={this.state.defaultPreview}
            />
          </div>
          <div className="col-3" />
        </div>
    
        {console.log(this.state.defaultPreview)}
        
     
      </div>
    );
  }
}

export default App