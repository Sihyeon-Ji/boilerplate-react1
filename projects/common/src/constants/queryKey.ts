//SECTION - 공통

//NOTE - 공통 쿼리키
export const commonKeys = {
	auth: {
		user: {
			all: () => ["auth", "user"],
			list: (param1: string, param2: string) => ["auth", "user", "list", param1, param2],
			detail: (userId: string) => ["auth", "user", "detail", userId],
		},
	},
};

//!SECTION

