<!-- 헤더 -->
![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=yarn%20berry%20monorepo%20frontend&fontSize=50)

<div align=center>

<h1> :boom: Introduction </h1>
Yarn Berry를 사용한 모노레포 프론트엔드 프레임워크입니다.<br/>
Vite, TypeScript, Reactv19, Redux, TailwindCSSv4, Shadcn/UI를 사용한 프론트엔드 프레임워크입니다.<br/>
<br/><br/>

# :astonished: What's in it
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat&logo=Yarn&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/shadcnui-000000?style=flat&logo=shadcnui&logoColor=white"/>
<br/><br/>

# 🔧 VSCode 확장 프로그램

프로젝트 개발을 위해 다음 VS Code 확장 프로그램을 설치해주세요:
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)
- [Comment Anchors](https://marketplace.visualstudio.com/items?itemName=ExodiusStudios.comment-anchors)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ZipFS - a zip file system](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs)

# ⚙️ Tailwind CSS 설정 관련 안내
> **참고**: 이 설정은 모노레포 환경에서 Tailwind CSS v4가 모든 프로젝트의 소스 파일을 인식하도록 합니다.  
> 자세한 내용은 [shadcn-ui/ui 토론](https://github.com/shadcn-ui/ui/discussions/6714#discussioncomment-12280129)을 참조하세요.
- projects/common/src/styles/index.css
```css
@source "../../../**/src/**/*.{ts,tsx}";
// ...
```


# 경로 참조 가이드
> **`@seodalgo/common/src/…`** : yarn berry monorepo의 workspace 기능으로 각 프로젝트에서 common 프로젝트의 모듈을 import하는 예시
> 
> **`@common/…`** : tsconfig의 paths로 절대 경로 설정 & Vite의 vite-tsconfig-paths 라이브러리 기능(혹은 alias 설정)으로 common 프로젝트의 모듈을 import하는 예시 (common 프로젝트 안에서는 무조건 @common/을 사용하거나 상대경로를 사용하여 path 충돌을 방지합니다)
> 
> **`@/types/…`** : tsconfig의 baseUrl, paths로 절대 경로 설정, Vite의 vite-tsconfig-paths 라이브러리 기능(혹은 alias 설정)으로 자기 프로젝트의 모듈을 import 하는 예시
>
> **혼란 방지를 위해** 각 프로젝트에서 common 프로젝트의 모듈을 import하는 기능은 tsconfig 절대경로 설정으로만 사용하고, yarn berry monorepo의 workspace 기능은 루트 디렉토리에서 script 사용 용도로 제한하였음


## 🛠️ 문제 해결
`cannot find module...` 하면서 잔뜩 에러가 뜨면 아래 명령어를 실행해보는 것을 추천합니다:
```bash
yarn install
yarn dlx @yarnpkg/sdks vscode
```

이후 "This workspace contains a TypeScript version." 메세지가 뜨면 **Allow** 클릭
실수로 Dismiss 했거나 메세지가 뜨지 않는다면:
1. 타입 스크립트로 되어있는 파일(ts, tsx)을 연다. `Press  in a TypeScript file`
2. `ctrl + shift + p`로 Command Pallette를 연다
3. `TypeScript: Select TypeScript Version...`  Typescript 버전을 선택.
4. `Use Workspace Version`을 선택합니다 (sdk가 표시된 항목)

## 🆕 새 프로젝트 추가하기
### 1. projects 폴더로 이동하기
```bash
cd projects
```
### 2. vite 프로젝트 생성
```bash
yarn create vite
# vite 설정: [프로젝트 이름] → react → typescript + swc
```
  
### 3. 루트 디렉토리의 package.json의 scripts에 프로젝트 추가

```json
"scripts": {
  "common": "yarn workspace @<통합프로젝트명>/common",
  "프로젝트명": "yarn workspace @<통합프로젝트명>/<프로젝트명>" // 이거
},
```
이렇게 하면 "workspace @<통합프로젝트명>/common"이 "common" 한 단어로 줄어듭니다:
```powershell
# 루트 디렉토리에서 실행
# 설정하기 이전
yarn start workspace @<통합프로젝트명>/프로젝트명
# 설정한 후
yarn start 프로젝트명
```
### 4. 새로 생성된 프로젝트의 package.json 수정
```json
{
  "name": "@<통합프로젝트명>/<프로젝트명>",
  "type": "module",
  ...
  "homepage": "/<프로젝트명>",
  "scripts": {...}, // port 번호 수정
  ...
}
```
### 5. 새로 생성된 프로젝트에 필수 dependency 추가
```bash
yarn add @tailwindcss/vite @tanstack/react-query axios lodash react react-cookie react-dom react-hook-form react-redux react-router-dom redux redux-persist tailwindcss 
yarn add -D @tanstack/react-query-devtools @types/lodash @types/node @types/react @types/react-dom @types/redux-persist @vitejs/plugin-react-swc cross-env typescript vite vite-plugin-remove-console vite-tsconfig-paths
```
### 6. 새로 생성된 프로젝트의 vite.config.ts 수정
```typescript
import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
//          리액트,  tailwindcss 설정,tsconfig path 라이브러리, 주석지우기
  plugins: [react(), tailwindcss(), tsconfigPaths(), removeConsole()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "../common/src"),
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  base: "/<프로젝트명>",
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.originalFileNames[0]?.split(".").at(1);

          // 이미지 파일 확장자 체크
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(String(extType))) {
            return `assets/img/[name]-[hash][extname]`;
          }
          // CSS 파일 체크
          if (extType === "css") {
            return `assets/css/[name]-[hash][extname]`;
          }
          // 기타 에셋
          return `assets/[ext]/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
  envDir: "../common/",
});
```
### 7. 새로 생성된 프로젝트의  tsconfig.json 설정
#### tsconfig.node.json
```json
{
  "extends": "../common/tsconfig.node.json",
  "include": ["vite.config.ts"]
}
```
#### tsconfig.json
```json
{
  "extends": "../common/tsconfig.json",
  "references": [{ "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".", // 기본 경로
    "paths": {
      "@/*": ["./src/*"], // '@' 별칭을 './src' 폴더로 설정
      "@common/*": ["../common/src/*"] // '@common' 별칭을 '../common/src' 폴더로 설정
    }
  },
  "include": ["src", "../common/src/types/components.d.ts"]
}
```
### 8. 환경변수 파일 vite-env.d.ts 설정
> ⚠️ **주의**: src 디렉토리에 있어야 합니다
```typescript
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../common/src/vite-env-override.d.ts" />
```
### 9. shadcn/ui 설정
> ⚠️ **주의**: 프로젝트의 루트 경로에 두어야 합니다
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../common/src/styles/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@common/components",
    "utils": "@common/utils/utils",
    "ui": "@common/components/ui",
    "lib": "@common/lib",
    "hooks": "@common/hooks"
  },
  "iconLibrary": "lucide"
}
```
### 10. 그 외 기본 파일 생성 및 수정
#### index.html
> ⚠️ **주의**: index.html 파일은 vite.config.ts 파일과 동일한 위치에 있어야 합니다
```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
    <meta name="theme-color" content="#000000" />
    <meta name="title" property="og:title" content="example" />
    <meta
      name="description"
      property="og:description"
      content="example에 오신 것을 환영합니다."
    />
    <meta property="og:site_name" content="example" />
    <!-- HTML Meta Tags -->
    <title>example</title>
    <meta name="description" content="example에 오신 것을 환영합니다." />
    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://example.com" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="example" />
    <meta property="og:description" content="example에 오신 것을 환영합니다." />
    <meta property="og:image" content="/Thumbnail.png" />
    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="example.com" />
    <meta property="twitter:url" content="https://example.com" />
    <meta name="twitter:title" content="example" />
    <meta
      name="twitter:description"
      content="example에 오신 것을 환영합니다."
    />
    <meta property="twitter:image" content="/Thumbnail.png" />

    <!-- Meta Tags Generated via https://www.opengraph.xyz -->
    <!-- <link rel="apple-touch-icon" href="/logo192.png" /> -->
    <link rel="manifest" href="/manifest.json" />

    <!-- daum Postcode API -->
    <script async src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```
#### public 디렉토리 파일
##### favicon.ico
##### manifest.json
```json
{
  "short_name": "example",
  "name": "example에 오신 것을 환영합니다.",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "48x48 32x32 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```
##### 각종 icon, 로고
##### robots.txt
#### 그 외 필수 파일
##### src/App.tsx
```tsx
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@common/config/reactQueryConfig";
import LoadingContainer from "@common/containers/LoadingContainers/LoadingContainer";
import PageRoutes from "@/config/routeConfig";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageContainer from "@common/containers/PageContainers/PageContainer";
import AsyncContainer from "@common/containers/PageContainers/AsyncContainer";
import "@common/styles/index.css"; // tailwindcss 설정
import { ThemeProvider } from "@common/containers/ThemeContainers/ThemeProvider";
import { Toaster } from "@common/components/ui/sonner";

const App = () => {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AsyncContainer>
            <LoadingContainer>
              <PageContainer>
                <PageRoutes />
                <Toaster />
              </PageContainer>
            </LoadingContainer>
          </AsyncContainer>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default App;
```
##### src/index.tsx
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@common/store/redux";
// import reportWebVitals from '@common/reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);

// Easily measure performance metrics in JavaScript
// reportWebVitals(console.log);

// 프론트 배포하는 도중 화면을 열어놓고 있는 사용자가 있다면,
// 새로고침 시켜서 "Failed to fetch dynamically imported module" 방지하기
window.addEventListener("vite:preloadError", () => {
  window.location.reload();
});
```
##### src/config/routeConfig.tsx
```tsx
import SignedInContainer from "@common/containers/PageContainers/SignedInContainer";
import SignedOutContainer from "@common/containers/PageContainers/SignedOutContainer";
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { RouteType } from "@common/types/urls";
import URLs from "@common/config/URLConfig";

// 코드 스플리팅을 위한 lazy import
// Common 공통
const InvalidApproach = lazy(
  () => import("@common/containers/PageContainers/InvalidApproach"),
);

// Main 메인
const Main = lazy(() => import("@/pages/Main/Main"));
const SignIn = lazy(() => import("@/pages/SignIn/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp/SignUp"));

const routes: RouteType[] = [
  {
    id: "main",
    path: URLs.Main,
    routeCondition: "WHENEVER",
    component: Main,
  },
  {
    id: "sign-in",
    path: URLs.SignIn,
    routeCondition: "WHENEVER",
    component: SignIn,
  },
  {
    id: "sign-up",
    path: URLs.SignUp,
    routeCondition: "WHENEVER",
    component: SignUp,
  },
];

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const { path, component: Component, routeCondition, id } = route;
          switch (routeCondition) {
            case "WHENEVER":
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <div id={id}>
                      <Component />
                    </div>
                  }
                />
              );
            case "SIGNED_IN":
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <SignedInContainer>
                      <div id={id}>
                        <Component />
                      </div>
                    </SignedInContainer>
                  }
                />
              );
            case "SIGNED_OUT":
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <SignedOutContainer>
                      <div id={id}>
                        <Component />
                      </div>
                    </SignedOutContainer>
                  }
                />
              );
          }
        })}
        <Route path="*" element={<InvalidApproach />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
```

# 커밋 메시지 정의 [gitmoji](https://gitmoji.dev/)
| 아이콘 |    설명    |    원문   |
| :----- | :--------- | :--------- |
|🎉(:tada:)|프로젝트 시작|Begin a project.|
|✨(:sparkles:)|새로운 기능 추가, 구현|Introduce new features.|
|🎨(:art:)|코드의 구조/포맷 개선|Improve structure / format of the code.|
|⚡️(:zap:)|성능 개선|Improve performance.|
|♻️(:recycle:)|코드 리팩토링|Refactor code.|
|🚧(:construction:)|진행 중|Work in progress.|
|💩(:poop:)|개선이 필요한 나쁜 코드|Write bad code that needs to be improved.|
|🔥(:fire:)|코드/파일 제거|Remove code or files.|
|⚰️(:coffin:)|dead code 제거|Remove dead code.|
|🚚(:truck:)|파일, 경로, route를 옮기거나 이름 변경|Move or rename resources (e.g.: files, paths, routes).|
|💄(:lipstick:)|UI, 스타일 관련 파일 추가 및 수정|Add or update the UI and style files.|
|🍱(:bento:)|asset 파일(이미지, 아이콘 등) 추가|Add or update assets.|
|🐛(:bug:)|버그 수정|Fix a bug.|
|✏️(:pencil2:)|단순 오타 수정|Fix typos.|
|🩹(:adhesive_bandage:)|단순한, critical하지 않은 이슈 수정|Simple fix for a non-critical issue.|
|🚑️(:ambulance:)|긴급 수정|Critical hotfix.|
|💡(:bulb:)|주석 추가/수정|Add or update comments in source code.|
|📝(:memo:)|문서 파일 추가 및 수정|Add or update documentation.|
|✅(:white_check_mark:)|테스트 추가/수정/패스|Add, update, or pass tests.|
|⬇️(:arrow_down:)|의존성 버전 다운그레이드|Downgrade dependencies.|
|⬆️(:arrow_up:)|의존성 버전 업그레이드|Upgrade dependencies.|
|📌(:pushpin:)|특정 버전 의존성 고정|Pin dependencies to specific versions.|
|➕(:heavy_plus_sign:)|의존성 추가|Add a dependency.|
|➖(:heavy_minus_sign:)|의존성 삭제|Remove a dependency.|
|💚(:green_heart:)|CI 빌드 수정|Fix CI Build.|
|👷(:construction_worker:)|CI 빌드 시스템 추가/수정|Add or update CI build system.|
|🔒️(:lock:)|보안 이슈 수정|Fix security or privacy issues.|
|🔐(:closed_lock_with_key:)|암호(키) 추가/수정|Add or update secrets.|
|🗃️(:card_file_box:)|데이터베이스 관련 수정|Perform database related changes.|
|🙈(:see_no_evil:)|.gitignore 추가/수정|Add or update a .gitignore file.|
|🔧(:wrench:)|설정 파일 수정|Add or update configuration files.|
|🔨(:hammer:)|개발 스크립트 추가/수정|Add or update development scripts.|
|🔖(:bookmark:)|릴리즈/버전 태그|Release / Version tags.|
|🚨(:rotating_light:)|compiler/linter 경고 수정|Fix compiler / linter warnings.|
|📈(:chart_with_upwards_trend:)|분석, 추적 코드 추가/수정|Add or update analytics or track code.|
|🌐(:globe_with_meridians:)|국제화 및 현지화|Internationalization and localization.|
|⏪️(:rewind:)|변경 내용 되돌림|Revert changes.|
|🔀(:twisted_rightwards_arrows:)|브랜치 merge|Merge branches.|
|📦️(:package:)|컴파일된 파일/패키지 추가/수정|Add or update compiled files or packages.|
|👽️(:alien:)|외부 API 변화로 인한 코드 수정|Update code due to external API changes.|
|📄(:page_facing_up:)|라이센스 추가/수정|Add or update license.|
|♿️(:wheelchair:)|웹 접근성 향상을 위한 코드 추가 및 수정|Improve accessibility.|
|🍻(:beers:)|술에 취해 쓴 코드|Write code drunkenly.|
|💬(:speech_balloon:)|텍스트 또는 리터럴 추가 및 수정|Add or update text and literals.|
|🔊(:loud_sound:)|로그 추가/수정|Add or update logs.|
|🔇(:mute:)|로그 제거|Remove logs.|
|👥(:busts_in_silhouette:)|기여자 추가/수정|Add or update contributor(s).|
|🚀(:rocket:)| |Deploy stuff.|
|💥(:boom:)| |Introduce breaking changes.|
|🚸(:children_crossing:)| |Improve user experience / usability.|
|🏗️(:building_construction:)| |Make architectural changes.|
|📱(:iphone:)| |Work on responsive design.|
|🤡(:clown_face:)| |Mock things.|
|🥚(:egg:)| |Add or update an easter egg.|
|📸(:camera_flash:)| |Add or update snapshots.|
|⚗️(:alembic:)| |Perform experiments.|
|🔍️(:mag:)| |Improve SEO.|
|🏷️(:label:)| |Add or update types.|
|🌱(:seedling:)| |Add or update seed files.|
|🚩(:triangular_flag_on_post:)| |Add, update, or remove feature flags.|
|🥅(:goal_net:)| |Catch errors.|
|💫(:dizzy:)| |Add or update animations and transitions.|
|🗑️(:wastebasket:)| |Deprecate code that needs to be cleaned up.|
|🛂(:passport_control:)| |Work on code related to authorization, roles and permissions.|
|🧐(:monocle_face:)| |Data exploration/inspection.|
|🧪(:test_tube:)| |Add a failing test.|
|👔(:necktie:)| |Add or update business logic.|
|🩺(:stethoscope:)| |Add or update healthcheck.|
|🧱(:bricks:)| |Infrastructure related changes.|
|🧑‍💻(:technologist:)| |Improve developer experience.|
|💸(:money_with_wings:)| |Add sponsorships or money related infrastructure.|
|🧵(:thread:)| |Add or update code related to multithreading or concurrency.|
|🦺(:safety_vest:)| |Add or update code related to validation.|

</div>