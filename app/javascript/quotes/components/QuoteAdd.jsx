import React from 'react'
import axios from 'axios';

class QuoteAdd extends React.Component {
  state = {
    text: '',
    author: '',
    formActive: false
  }

  handleChange = (event) => {
    let key = `${event.target.name}`
    let value = `${event.target.value}`
    this.setState({
      [key]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/quotes', {
      text: event.target[0].value,
      author: event.target[1].value
    })
    .then(() => {
      this.setState({
        text: '',
        author: '',
        formActive: false
      })
    })
    .then(() => this.props.fetchQuote(this.props.id))
  }

  showCloseForm = () => {
    this.state.formActive ? this.setState({formActive: false}) : this.setState({formActive: true})
  }

  render () {
    return (
      this.state.formActive ?
      <div>
        <form onSubmit={this.handleSubmit} >
          Add a New Quote! <br/>
          Text: <input type='text' value={this.state.text} name='text' onChange={this.handleChange}/><br/>
          Author: <input type='text' value={this.state.author} name='author' onChange={this.handleChange}/><br/>
          <input type='submit' value='Add'/>
          <button onClick={this.showCloseForm}>Cancel</button>
        </form>
      </div>
      :
      <div>
        <button onClick={this.showCloseForm}>Add Quote</button>
      </div>
    )
  }
}

export default QuoteAdd
