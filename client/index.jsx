import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ListEntry from './components/ListEntry.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      items: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getAll = this.getAll.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  handleInput(e) {
    this.setState({
      item: e.target.value
    });
  }

  addItem() {
    axios.post('/list', {
      item: this.state.item
    })
      .then(() => {
        console.log('added Successfully'),
          this.getAll();
      }).catch(err => { 'Post error' })
  }

  getAll() {
    axios.get('/list')
      .then(data => {
        this.setState({
          items: data.data
        })
      }).catch(err => console.log('Get error'))
  }

  delete(itemID) {
    axios.delete('/list', {
      params: { itemID: itemID }
    })
      .then(this.getAll()).catch(err => console.log(err));
  }

  update(itemID) {
    new Promise((resolve, reject) => {
      var item = prompt('Enter in new item here: ');
      if (!item) {
        reject();
      } else {
        resolve(item);
      }
    }).then(item => {
      axios.put('/list', {
        itemID: itemID,
        item: item
      }).then(
        console.log('Successfully updated item'),
        this.getAll()
      ).catch(err => { console.log('Error updating to database') })
    }).catch(err => { console.log('Error: try editing name again') })
  }
  render(props) {
    return (
      <div>
        <h3>Grocery List</h3>
        <input onKeyUp={this.handleInput}></input>
        <button onClick={this.addItem}>Add item!</button>
        <hr />
        {this.state.items.map(item => {
          return <ListEntry key={item._id} item={item.item} update={this.update.bind(this, item._id)} delete={this.delete.bind(this, item._id)} />
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;