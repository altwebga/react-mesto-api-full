import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password,
      clearInputs: () => this.setState({ email: "", password: "" }),
    });
  }
  render() {
    return (
      <div className="login">
        <p className="login__welcome">Вход</p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            className="login__form-input"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Пароль"
            value={this.state.password}
            onChange={this.handleChange}
            className="login__form-input"
          />
          <div className="login__button-container">
            <button
              type="submit"
              onSubmit={this.handleSubmit}
              className="login__link"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
