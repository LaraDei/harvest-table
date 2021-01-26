import React, { Component } from 'react'

const Context = React.createContext({
    items: [],
    messages: [],
    //locations: [],
    isLoggedIn: false,
    setMsgList: () => {},
    setItemsList: ()=> {},
    deletePhoto: () => {},
    addPhoto: () => {},
    addAlbum: () => {},
    handleLog: () => {},
})

export default Context

export class ItemProvider extends Component {
  state = {
    items: [],
    messages: [],
    //locations: [],
  };

  setItemsList = items => {
    this.setState( {items} )
  }

  setMsgList = messages => {
    this.setState( {messages} )
  }
  // setLocationList = items => {
  //     const myLocations = items.map((i) => {
  //        return {lat: i.lat, lng:i.lng}
  //     })
  //     console.log(myLocations)
  //     this.setState( {locations: myLocations} )
  //     console.log(this.state.locations)
  // }
  
  deleteItem = itemId => {
    // eslint-disable-next-line eqeqeq
    const newList = this.state.items.filter(item => item.id != itemId)
    this.setState({
      items: newList
    },)
  }

  sendMsg = msg =>{
    this.setState(
        {
         messages : [...this.state.messages, msg]
        },
    )
  }

  addItem = item =>{
    this.setState(
        {
          items: [...this.state.items, item]
        },
    )
  }
  

  render() {
    const value = {
      items: this.state.items,
      messages: this.state.messages,
     // locations: this.state.locations,
      isLoggedIn: this.state.isLoggedIn,
      setItemsList: this.setItemsList,
      setMsgList: this.setMsgList,
      //setLocationList: this.setLocationList,
      addItem: this.addItem,
      sendMsg: this.sendMsg,
      deleteItem: this.deleteItem,
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}