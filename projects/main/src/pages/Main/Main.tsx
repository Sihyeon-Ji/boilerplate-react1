import React from "react";
import useUser from "@common/store/reduxHooks/useUser";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@common/components/ui/card";
import { Input } from "@common/components/ui/input";
import { Label } from "@common/components/ui/label";
import { Switch } from "@common/components/ui/switch";
import { Button } from "@common/components/ui/button";
import { Checkbox } from "@common/components/ui/checkbox";
import { ModeToggle } from "@common/components/mode-toggle";
const Main = () => {
	const { user } = useUser();

	return (
		<>
			<main className="flex h-screen w-screen items-center justify-center">
				<h2>{user?.name}</h2>
				<Card className="w-[30rem]">
					<CardHeader>
						<CardTitle>로그인</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-y-2 pb-4">
						<Input placeholder="아이디를 입력하세요." />
						<Input placeholder="비밀번호를 입력하세요." type="password" />
					</CardContent>
					<CardFooter className="block">
						<div className="mb-2 flex w-full justify-between">
							<div className="flex items-center space-x-2">
								<Checkbox id="keep" />
								<Label htmlFor="keep">로그인 유지하기</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Label htmlFor="id-security">IP 보안</Label>
								<Switch id="ip-security" />
							</div>
						</div>
						<Button className="w-full">로그인</Button>
					</CardFooter>
				</Card>
				<ModeToggle />
			</main>
		</>
	);
};

export default React.memo(Main);
