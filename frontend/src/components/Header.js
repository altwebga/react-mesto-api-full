import logo from '../images/logo-white.svg';
import { useLocation, Link, withRouter } from "react-router-dom";
import { useState } from "react";

function Header(props) {
	let location = useLocation();

	const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);

	function logOut() {
		setisMobileMenuOpen(false)
		props.signOut()
	}

	return (
		<>
			<div className={`${'header__top'} ${isMobileMenuOpen && 'header__top_visible'}`}></div>
			<header className="header">

				<Link to='/'><img className="logo" src={logo} alt="Место Россия" /></Link>

				<nav className="header__links">
					{(location.pathname === '/sign-in') ?
						<Link className="header__link" to='/sign-up'>Регистрация</Link>
						: (location.pathname === '/sign-up') ?
							<Link className="header__link" to='/sign-in'>Войти</Link>
							: <div className="header__loggedin">
								<nav className={`${'header__loggedin_links'} ${isMobileMenuOpen && 'header__loggedin_links_visible'}`}>
									<p className="header__email">{props.userEmail}</p>
									<button className="header__link header__link_out" to='#' onClick={logOut}>Выйти</button>
								</nav>

								<label htmlFor='mobilemenu' className="mobile-menu" >
									<input type="checkbox" name="mobilemenu" id="mobilemenu" className="mobile-menu__checkbox" onChange={() => setisMobileMenuOpen(!isMobileMenuOpen)} />
									<span htmlFor='mobilemenu' className="mobile-menu__icon" />
								</label>

							</div>
					}
				</nav>

			</header>
		</>
	);
}

export default withRouter(Header);
