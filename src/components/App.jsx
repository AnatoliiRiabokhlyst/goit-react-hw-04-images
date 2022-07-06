import React from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";


class App extends React.Component{
  state = {
    search: '',
}
  onHandleSearch = search => {
    this.setState({ search }); 
}
  render(){
    return (
    <div>
      <Searchbar onSearch={this.onHandleSearch} />
      <ImageGallery search={this.state.search} />
    </div>
  );
  }
}


export {App}
