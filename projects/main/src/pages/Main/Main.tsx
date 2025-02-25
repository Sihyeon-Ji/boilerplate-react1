import React from "react";
import Header from "@common/components/Header/Header";
import Footer from "@common/components/Footer/Footer";
import useUser from "@common/store/reduxHooks/useUser";
import { Button } from "@common/components/ui/button";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@common/components/ui/accordion";

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
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Is it styled?</AccordionTrigger>
						<AccordionContent>
							Yes. It comes with default styles that matches the other
							components&apos; aesthetic.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Is it animated?</AccordionTrigger>
						<AccordionContent>
							{`Yes. It's animated by default, but you can disable it if you`}
							prefer.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<Footer />
		</div>
	);
};

export default React.memo(Main);
