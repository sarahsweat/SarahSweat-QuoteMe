import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import QuoteNavigation from './QuoteNavigation';
import QuoteBody from './QuoteBody';
import QuoteAdd from './QuoteAdd';

class QuotesDisplay extends React.Component {
  constructor() {
    super()
    this.state = {
      quote: {},
      fireRedirect: false
    }
  }

  fetchQuote(id) {
    axios.get(`api/quotes/${id}`)
      .then(response => {
        this.setState({ quote: response.data })
      })
      .catch(error => {
        console.error(error)
        this.setState({ fireRedirect: true })
      })
  }

  setQuoteIdFromQueryString(qs) {
    this.qsParams = queryString.parse(qs)
    if (this.qsParams.quote) {
      // assign quote ID from the URL's query string
      this.quoteId = Number(this.qsParams.quote)
    } else {
      this.quoteId = this.props.startingQuoteId
      // update URL in browser to reflect current quote in query string
      this.props.history.push(`/?quote=${this.quoteId}`)
    }
  }

  componentDidMount() {
    this.setQuoteIdFromQueryString(this.props.location.search)
    this.fetchQuote(this.quoteId)
  }

  componentWillReceiveProps(nextProps) {
    this.setQuoteIdFromQueryString(nextProps.location.search)
    this.fetchQuote(this.quoteId)
  }

  render() {
    const quote = this.state.quote
    const nextQuoteId = quote.next_id
    const previousQuoteId = quote.previous_id
    const lastQuoteId = quote.last_id
    const randomQuoteId = Math.floor(Math.random() * (lastQuoteId)) + 1
    return (
      <div>
        <div className='quote-container'>
          { this.state.fireRedirect ?
            <Redirect to={'/'} /> :
            null }

          { previousQuoteId ?
            <QuoteNavigation direction='previous' otherQuoteId={previousQuoteId} /> :
            null }

          <QuoteBody quote={quote} />

          { this.state.quote.next_id ?
            <QuoteNavigation direction='next' otherQuoteId={nextQuoteId} /> :
            null }


        </div>
        <div id='footer'>
          {this.state.quote.id !== parseInt(this.props.startingQuoteId, 10) ?
            <Link className='btn btn-primary' to={`/?quote=${this.props.startingQuoteId}`}>
              Back to Beginning <br/>
            </Link> :
            null }
          <Link className='btn btn-primary' to={`/?quote=${randomQuoteId}`}>
            Random Quote
          </Link>
          <br/>
          <br/>
          <QuoteAdd handlePost={this.fetchQuote} id={quote.id}/>

        </div>

      </div>
    )
  }
}

export default QuotesDisplay
