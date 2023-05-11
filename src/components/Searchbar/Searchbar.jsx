import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
    // isButtonDisabled: true,
  };

  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({
      query: value.toLowerCase(),
      // isButtonDisabled: value.length === 0,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return this.props.handleErrorMessage('Please fill in all fields');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ page: 1 });
    // this.setState({ page: 1, isButtonDisabled: true });
  };

  render() {
    const { query } = this.state;
    // const { query, isButtonDisabled } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />

          {/* <button type="submit" className="button" disabled={isButtonDisabled}> */}
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
