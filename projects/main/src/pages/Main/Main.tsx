import React from "react";
import Header from "@common/src/components/Header/Header";
import Footer from "@common/src/components/Footer/Footer";
import useUser from "@common/src/store/reduxHooks/useUser";

const Main = () => {
	const { user } = useUser();

	return (
		<div className="mui-content">
			<Header />
			<div>
				<h1>Main</h1>
				<h2>{user?.name}</h2>
			</div>
			<Footer />
		</div>
	);
};

export default React.memo(Main);
