import React from "react";
import useUser from "../../store/reduxHooks/useUser";

const Header = () => {
	const { user } = useUser();

	return (
		<header className="header">
			<div className="logo">
				<a href="/">로고</a>
			</div>

			<nav className="nav">
				<ul className="nav-list">
					<li>
						<a href="/about">소개</a>
					</li>
					<li>
						<a href="/services">서비스</a>
					</li>
					<li>
						<a href="/contact">문의하기</a>
					</li>
				</ul>
			</nav>

			<div className="user-info">
				{user ? (
					<>
						<span>{user.name}님</span>
						<a href="/profile">프로필</a>
					</>
				) : (
					<a href="/sign-in">로그인</a>
				)}
			</div>
		</header>
	);
};

export default Header;
