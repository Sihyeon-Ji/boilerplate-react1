import React from "react";

const Footer = () => {
	return (
		<footer>
			<nav className="footer-nav">
				<ul>
					<li>
						<a
							href={`${import.meta.env.VITE_SUPPORT_URL}/main`}
							target="_blank"
							rel="noopener noreferrer"
						>
							고객센터
						</a>
					</li>
				</ul>
			</nav>
			<div className="footer-copyright">
				Copyright © 2025 by example All rights reserved.
			</div>
		</footer>
	);
};

export default React.memo(Footer);
