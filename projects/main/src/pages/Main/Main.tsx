import React from "react";
import Header from "@common/components/Header/Header";
import Footer from "@common/components/Footer/Footer";
import useUser from "@common/store/reduxHooks/useUser";
import { Button } from "@common/components/ui/button";

const Main = () => {
	const { user } = useUser();

	return (
		<div className="mui-content">
			<Header />
			<div>
				<h1>Main</h1>
				<h2>{user?.name}</h2>
				<Button variant="default" className="bg-red-500">
					Click me
				</Button>
			</div>
			<Footer />
		</div>
	);
};

export default React.memo(Main);
