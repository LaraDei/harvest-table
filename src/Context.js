import React, { Component } from 'react'

const Context = React.createContext({
    items: [],
    messages: [],
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
  };

  setItemsList = items => {
    this.setState( {items} )
    // console.log(this.state)
  }

  setMsgList = messages => {
    this.setState( {messages} )
  }
  
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
  handleLog = e => {
    this.setState(prevState => {
      return {
        isLoggedIn: !prevState.isLoggedIn
      }
  })
  }

  render() {
    const value = {
      items: this.state.items,
      // messages: this.state.messages,
      isLoggedIn: this.state.isLoggedIn,
      setItemsList: this.setItemsList,
      setMsgList: this.setMsgList,
      //setLocationList: this.setLocationList,
      addItem: this.addItem,
      sendMsg: this.sendMsg,
      deleteItem: this.deleteItem,
      handleLog: this.handleLog
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}