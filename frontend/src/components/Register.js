import React from "react";
import { Link, withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password,
    });
  };
  render() {
    return (
      <div className="register">
        <p className="register__welcome">Регистрация</p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            className="register__form-input"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Пароль"
            value={this.state.password}
            onChange={this.handleChange}
            className="register__form-input"
          />
          <div className="register__button-container">
            <button
              type="submit"
              onSubmit={this.handleSubmit}
              className="register__link"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>

        <div className="register__signin">
          <p className="register__signin-text">
            Уже зарегистрированы?{" "}
            <Link to="/sign-in" className="register__login-link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
