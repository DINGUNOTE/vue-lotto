# 0. Getting Started (시작하기)

```bash
$ npm install
$ npm run dev
```

[서비스 링크](https://dingunote.github.io/vue-lotto/)

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)

- Vue를 이용해서 로또 당첨 정보, 번호 추첨 앱 만들기

<br/>
<br/>

# 2. Key Features (주요 기능)
1. 로또 당첨회차 당첨 정보 확인(회차 별로 확인하는 기능은 추후 추가 예정)
2. 고정적으로 넣을 번호와, 제외할 번호를 골라서 로또 추천 번호 생성
3. 최근 100회차 당첨 정보를 취합해서 가장 많이 나온 번호와 가장 적게 나온 번호 등 통계 확인(개발 예정)

<br/>
<br/>

# 3. Technology Stack (기술 스택)

|            |                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| HTML5      | <img src="https://github.com/user-attachments/assets/2e122e74-a28b-4ce7-aff6-382959216d31" alt="HTML5" width="100">      |
| CSS3       | <img src="https://github.com/user-attachments/assets/c531b03d-55a3-40bf-9195-9ff8c4688f13" alt="CSS3" width="100">       |
| Javascript | <img src="https://github.com/user-attachments/assets/4a7d7074-8c71-48b4-8652-7431477669d1" alt="Javascript" width="100"> |
| Vue        | <img src="https://github.com/user-attachments/assets/62f63000-5ea5-484e-8a3b-4ec5b2af7258" alt="Vue" width="100">        |

- Pinia
- Axios
- Vuetify3

<br/>

# 4. Project Structure (프로젝트 구조)

```plaintext
project/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/                       # API 폴더
│   │   └── index.js               - 로또 당첨 번호 조회 API 함수 관리
│   ├── assets/                    # 공통 스타일 폴더
│   │   ├── reset.css              - 스타일 초기화
│   │   ├── base.scss              - 기본 스타일 설정
│   │   └── main.css               - 최종 적용 스타일 구성
│   ├── components/                # 컴포넌트 폴더
│   │   ├── HeaderComponent.vue    - App Header 컴포넌트
│   │   ├── AlertComponent.vue     - 알림 메세지 컴포넌트
│   │   ├── BallComponent.vue      - 로또 공 컴포넌트
│   │   └── FooterComponent.vue    - App Footer 컴포넌트
│   ├── router/                    # 페이지 라우팅 관리 폴더
│   └── index.js                   - vue-router 설정 파일
│   ├── plugins/                   # 기타 플러그인 관련 폴더
│   │   └── vuetify.js             - Vuetify 관련 설정 파일
│   ├── store/                     # App 상태 관리 폴더
│   │   └── index.js               - App 내에 전반적으로 사용되는 상태 값, 공통 함수 관리
│   ├── utils/                     # 유틸리티 함수 폴더
│   │   └── index.js               - App 내에 공통적으로 사용되는 유틸 함수 관리
│   ├── views/                     # 페이지 컴포넌트 폴더
│   │   ├── HomeView.vue           - 메인 페이지 컴포넌트(최신 회차 로또 당첨 번호 조회)
│   │   ├── GetNumbersView.vue     - 로또 당첨 번호 뽑기 페이지 컴포넌트
│   │   └── DrawComponent.vue      - 로또 번호 추첨 결과 Dialog 컴포넌트
│   ├── App.vue                    # App Root vue 파일
│   └── main.js                    # App Root js 파일
└── README.md                      # 프로젝트 개요 및 사용법
```
