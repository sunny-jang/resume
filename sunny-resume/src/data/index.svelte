<script context="module">
export let name = '장은선';
export let engName = 'Sunny';
export let lastUpdated = '2023.01.15';

export let channels = [
    {
        label: 'Github',
        href: 'https://github.com/sunny-jang',
        text: 'https://github.com/sunny-jang'
    },
    {
        label: 'Blog',
        href: 'https://sunny-jang.tistory.com',
        text: 'https://sunny-jang.tistory.com'
    },
];
export let contract = [
    {
        label: 'Email',
        text: 'esunbest@gmail.com'
    },
];

export let introduction = [
    '프로젝트 결과물이 성과를 보였을 때 가장 성취감이 큰',
    '개발 생산성을 높이는기술을 서비스에 접목시킬 때가 즐거운',
    '새로운 것을 배우는 것에 두려움이 없는',
    '한줄의 코드로도 여러 삶에 가치를 더해줄 수 있는',
]


export let introductionText = `
    안녕하세요. 4년차 프론트앤드 개발자 장은선입니다. </br></br>

    웹/앱 서비스의 프론트앤드 개발과 스타트업 개발자로서의 많은 경험을 가지고 있습니다. React, javsScript, typeScript, Redux, SWR, Git 등을 사용하여 프로덕션 서비스를 설계 개발, 
    운영한 경험으로 확장성과 유지보수성이 높은 개발을 하기 위해 언제나 고민하고 있습니다. </br>
    프론트앤드 개발자로 다수의 프로젝트에 참여해 갖춘 업무처리속도와 다양한 플랫폼 기반의 UX개발 경험들은 제 강점중의 하나입니다.</br>
    신속한 서비스 제공과 안정화된 코드로 유저들에게 편리함과 신뢰할 수 있는 서비스의 경험을 남기기 위해 노력하고 있습니다.</br></br>

    새로운 기술에도 관심과 궁금증이 많아 다양한 개발 밋업에 참여하고, 개발그룹에서의 네트워킹과 토론을 즐깁니다.</br>
    언젠가 프론트 앤드 개발에 정점을 찍어 웹 개발에 관련 서적을 내고, 많은 사람들에게 지식을 전파할 수 있는 개발자가 되겠다는 목표가 있습니다. </br>
    이를 이루기 위해 꾸준한 공부를 하고, 웹개발을 배우는 동료가 있으면 제가 가진 지식으로 언제나 도움을 주려고 합니다.</br></br>

    서비스란, 사람들이 머무르고 계속 사용하고 싶은 프로그램을 제공하는 것이라고 생각합니다.</br>
    저의 다양한 경험들을 활용해 사랑받는 서비스를 개발해 지속적으로 성장해 나가고 싶습니다. </br>
`

export let workSection = {
    workList: [
        {
            companyName: '판도라티비',
            period: '2021-07~ 재직 중',
            description: '경제에 관심을 가지는 유저들의 블록체인 커뮤니티 web과 mobile 메인 프론트앤드 개발 담당',
            detailList: [
                { content: '글로벌 IDO 중개 플랫폼 오픈 web3 서비스 운영 및 유지보수' },
                { content: '사용자 Needs 에 맞는 사용성 개선과 신규 비즈니스 로직 구현' },
                { content: '레거시 청산 및 기존 비즈니스 유지보수' },
                { content: '웹 서비스와 포맷이 맞지 않는 앱의 글쓰기에서 웹뷰에 CkEditor를 사용해 글쓰기 기능 통일' },
                { content: 'typeScirpt, swr 도입으로 코드 프로젝트 퀄리티 개선' },
            ],
            techSkils: ['React', 'swr', 'redux-saga', 'less', 'javaScript', 'typeScript'],
            projects: [
                {
                    projectTitle: 'Cobak 블록체인 커뮤니티 운영/리뉴얼',
                    projectGroup: 'Pandora.TV',
                    period: '2021년 07월 - 진행 중',
                    description: `블록체인 커뮤니티 Cobak 운영 및 고도화

                        - 상시 운영업무를 하며 유저들의 피드백을 받아 WEB/MOBILE 플랫폼의 기능 고도화와 신규 기능 개발에 기여
                        - 운영업무에 필요한 Back-office 개발. <b>운영업무의 편리성을 향상 및 반복 업무 감축</b>
                        - 신규 게시글 리스트 UI 컴포넌트 신규 개발, 기존 리스트 방식을 신규 UI로 전체 교체
                        - 기존 리덕스에서 데이터 호출 방식 -> <b>SWR캐싱 도입으로 재 접속 화면 로딩속도 개선</b>에 기여
                        - Dynamic Import 도입, gzip 압축방식, code-spliting <b>적용으로 FCP 6.3s -> 0.9s로 개선</b>
                    `
                },
                {
                    projectTitle: '뉴스속보/ 뉴스매체 커스텀 기능 개발',
                    projectGroup: 'Pandora.TV',
                    period: '2022년 10월 - 2019년 12월',
                    description: `<b>연합뉴스, 파이내내셜 쥬스 등 타 뉴스 매체의 api</b>를 받아와 코박 서비스 내에서 주요 경제뉴스를 모아 보는 웹 신규 서비스 개발
                    
                        - 원하는 매체사의 뉴스만을 모아볼 수 있도록 나만의 커스텀 기능 개발
                        - 각 매체사의 실시간 데이터를 수집해 <b>실시간 속보 갱신</b>
                        - 비회원, 회원을 기준 디폴트 뉴스 및 커스텀 리스트를 분리
                        `
                },
                {
                    projectTitle: '앱 서비스 글쓰기/상세보기 웹뷰 전환',
                    projectGroup: 'Pandora.TV',
                    period: '2022년 08월 - 2022년 10월',
                    description: `- 웹에서 작성한 글을 앱에서 수정 시 포맷 이슈가 발생하여 <b>네이티브 텍스트 펜집기로 구현되어 있는 화면을 신규 웹뷰 화면으로 전환</b>작업
                        - Ckeditor를 사용해 에디터 구현.
                        - <b>네이티브 앱 ios와 andriod 통신하는 appInterface 개발</b> 및 문서정리
                        `
                },
                {
                    projectTitle: 'Global IDO 토큰중개 서비스',
                    projectGroup: 'Pandora.TV',
                    period: '2022년 06월 - 2022년 08월',
                    description: `web3를 사용한 지갑연동 및 상태 관리
                        - i18n라이브러리를 접목하여 다국어 기능을 지원.
                        - 자체토큰 스테이킹/거버넌스 기능
                        `
                },
            ]
        },
        {
            companyName: 'Evolve Branding (Canada)',
            period: '2020-03~2020-09',
            description: '비지니스 브랜딩을 돕는 캐나다 기업의 인턴십 프로그램의 팀 리더, Flutter 프레임워크를 사용하는 4개 프로젝트 참여',
            detailList: [
                { content: 'Flutter/Dart를 사용한 IOS/Android App 제작' },
                { content: 'Google 번역기 API 라이브러리 이용,  목소리 인식 실시간 번역 서비스' },
                { content: 'Neumorphic 커스텀 테마 패키지 위젯 개발' },
            ],
            techSkils: ['Flutter', 'Dart', 'firebase', 'Hybrid App'],
            projects: [
                {
                    projectTitle: 'CATBOOK (SNS)',
                    projectGroup: 'Evolve Branding',
                    period: '2020년 04월 - 2020년 05월',
                    description: `반려묘들을 위한 고양이 자랑 커뮤니티/SNS 서비스
                    - <b>Newmorphic 커스텀 테마 위젯 모듈을 개발</b>해 전반적인 UI/UX 개발에 적용
                    - Firebase를 사용해 <b>DB 구축 및 게시글 작성, 수정, 삭제, 조회 기능</b>을 구현 
                    - <b>Firebase 의 authrozation 기능</b>을 사용해 회원가입/로그인 보안 강화
                        `
                },
                {
                    projectTitle: 'Evolve Store',
                    projectGroup: 'Evolve Branding',
                    period: '2020년 05월 - 2020년 06월, 2022년 07월 - 2022년 08월',
                    description: `인턴십 프로그램에 참여하여 얻은 Score로 물품을 구매할 수 있는 인턴십 내 스토어 앱 개발

            - firebase realtime 데이터베이스로 각 프로젝트 내의 채팅기능 개발
            - 어드민에게만 프로젝트 생성 및 인턴 배정 권한을 적용
            - <b>팀 리더로 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도</b>. 설계 기능의 기술적 타당성 및 최적화 할 수 있는 방안을 모색.
                        `
                },
                {
                    projectTitle: 'Dictionary & Translator',
                    projectGroup: 'Evolve Branding',
                    period: '2020년 06월 - 2020년 09월',
                    description: `목소리를 인식하여 직역해주는 번역 프로그램 개발

            - <b>google translator API</b>를 활용하여 직접 문장을 입력하여 번역기능을 제공하는 것을 베이스 개발
            - 제공하는 10개 이상의 언어에서 <b>목소리 인식 번역 기능</b>을 추가를 위해 voice reconizer 패키지 접목.
            - 번역 후 모르는 단어들은 바로 찾아볼 수 있도록 사전 기능을 제공 편리성을 개선.
                        `
                },
            ]
        },
        {
            companyName: 'F9dev',
            period: '2017-06~2019-01',
            description: '하이브리드 앱을 의뢰받아 구축 및 설계, 자사 e커머스 ClosedShop의 서비스 운영',
            detailList: [
                { content: 'AngularJS, Ionic 을 사용한 WebView Hybrid App 개발' },
                { content: 'Canvas를 사용하여 데이터를 시각화' },
                { content: 'Monthly 개발 컨퍼런스에 참여해 구성원으로서 기술로 회사의 비지니스에 더 많이 기여할 수 있는 방향을 고민' },
                { content: '초기 멤버로써 서비스에 애정을 가지고 고객의 시선에서 경험을 최우선으로 하는 업무 분위기에서 프론트앤드 개발' },
            ],
            techSkils: ['AngularJs', 'Ionic', 'javaScript', 'ajax', 'html', 'sass', 'less'],
            projects: [
                {
                    projectTitle: '클로즈 샵(e-Commerce)',
                    projectGroup: 'F9dev',
                    period: '2018년 1월 - 2019년 01월',
                    description: `<b>F9dev 자체 전자상거래 웹사이트</b>를 구축 및 운영.

            - 대규모 e-Commerce서비스로 성장하기 위한 디테일에 초점을 맞춰 개발
            - 느린 속도를 유발하는 <b>js 애니메이션을 css 애니메이션으로 교체</b>작업을 하여 라이트한 웹으로 퍼포먼스 개선
                        `
                },
                {
                    projectTitle: 'SPOTV (스포츠 스트리밍 서비스)',
                    projectGroup: 'F9dev',
                    period: '2018년 4월 - 2018년 7월',
                    description: `SPOTV의 웹사이트와 하이브리드 앱 프론트엔드 개발

            - 넷플릭스의 참조해 전체적인 UI/UX를 디자인 및 구축
            - <b>앱에서 작동하는 웹 동작의 차이(터치 모션 등)를 축소하여 퍼포먼스 개선</b>
                        `
                },
                {
                    projectTitle: 'RnbStory Hybrid APP (SNS)',
                    projectGroup: 'F9dev',
                    period: '2018년 4월 - 2018년 6월',
                    description: `RnbStory 웹사이트와 하이브리드 앱 프론트엔드 개발.

            - 유명한 SNS 웹사이트나 애플리케이션을 검토해 기술과 오픈 소스를 참조
            - 웹 사이트 정비를 위한 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도했습니다. 설계 기능의 기술적 타당성 및 최적 기능 보장
                        `
                },
                {
                    projectTitle: 'BuyCar(중고차) Hybrid App',
                    projectGroup: 'F9dev',
                    period: '2017년 8월 - 2019년 01월',
                    description: `자동차 중고거래 및 경매 플랫폼 운영 및 유지보수

            - <b>브랜드, 기능, 중고차의 구성 요소를 디자인적 요소로 구현하여 사용자에게 편리성을 제공</b> 
            - 경매가 입찰을 calculator 컴포넌트 간편사용을 위한 <b>일괄 증가, 현재가 기준 일정금액 증가 등 기능 개발</b>에 기여
                        `
                },
            ]
        },
        {
            companyName: '㈜메이젠인터렉트',
            period: '2016-01~2017-01',
            description: '공공기관, 공기업, 큰 규모의 다양한 프로젝트의 마크업 개발 ',
            detailList: [
                { content: '다수의 프로젝트 웹 접근성 90%→98% 불합격 수정 및 마크 획득' },
                { content: '접근성이 지켜지지 않은 사이트들에 시맨틱 마크업을 적용해 SEO작업, 접근성 개선' },
                { content: '브라우저 호환성 준수 등 크로스 브라우징 작업' },
                { content: 'Mobile First 휴대폰, 테블릿, PC 등의 다양한 디바이스 반응형 작업' },
                { content: '프로젝트 레이아웃과 페이지 이슈에 대응하는 업무를 진행' },
            ],
            techSkils: ['Html', 'css', 'javaScript', 'jQuery'],
            projects: [
                {
                    projectTitle: '신한은행 임직원 강의 웹사이트 리뉴얼',
                    projectGroup: 'Mayzen',
                    period: '2016년 12월 - 2017년 12월',
                    description: `- <b>SEO, 장애인을 위한 웹 접근성, 체계적인 구조를 갖춘 웹사이트 구축</b>
            - 유지보수를 위한 가이드 문서를 만들었습니다.
                        `
                },
                {
                    projectTitle: 'Hyundai Life web channel Construct',
                    projectGroup: 'Mayzen',
                    period: '2016년 8월 - 2016년 11월',
                    description: `- UI개발에 넥사크로 사용 `
                },
                {
                    projectTitle: '군인공제회 대학원 입학 홈페이지',
                    projectGroup: 'Mayzen',
                    period: '2017년 7월 - 2017년 8월',
                    description: null
                },
                {
                    projectTitle: '농협캐미컬 웹사이트 리뉴얼 UI 마크업 개발',
                    projectGroup: 'Mayzen',
                    period: '2016년 2월 - 2016년 4월',
                    description: null
                },
            ]
        },
    ]
}

export const projects = [
    {
        projectTitle: 'Cobak 블록체인 커뮤니티 운영/리뉴얼',
        projectGroup: 'Pandora.TV',
        period: '2021년 07월 - 진행 중',
        description: `블록체인 커뮤니티 Cobak 운영 및 고도화

            - 상시 운영업무를 하며 유저들의 피드백을 받아 WEB/MOBILE 플랫폼의 기능 고도화와 신규 기능 개발에 기여
            - 운영업무에 필요한 Back-office 개발. <b>운영업무의 편리성을 향상 및 반복 업무 감축</b>
            - 신규 게시글 리스트 UI 컴포넌트 신규 개발, 기존 리스트 방식을 신규 UI로 전체 교체
            - 기존 리덕스에서 데이터 호출 방식 -> <b>SWR캐싱 도입으로 재 접속 화면 로딩속도 개선</b>에 기여
            - Dynamic Import 도입, gzip 압축방식, code-spliting <b>적용으로 FCP 6.3s -> 0.9s로 개선</b>
        `
    },
    {
        projectTitle: '뉴스속보/ 뉴스매체 커스텀 기능 개발',
        projectGroup: 'Pandora.TV',
        period: '2022년 10월 - 2019년 12월',
        description: `<b>연합뉴스, 파이내내셜 쥬스 등 타 뉴스 매체의 api</b>를 받아와 코박 서비스 내에서 주요 경제뉴스를 모아 보는 웹 신규 서비스 개발
        
            - 원하는 매체사의 뉴스만을 모아볼 수 있도록 나만의 커스텀 기능 개발
            - 각 매체사의 실시간 데이터를 수집해 <b>실시간 속보 갱신</b>
            - 비회원, 회원을 기준 디폴트 뉴스 및 커스텀 리스트를 분리
            `
    },
    {
        projectTitle: '앱 서비스 글쓰기/상세보기 웹뷰 전환',
        projectGroup: 'Pandora.TV',
        period: '2022년 08월 - 2022년 10월',
        description: `- 웹에서 작성한 글을 앱에서 수정 시 포맷 이슈가 발생하여 <b>네이티브 텍스트 펜집기로 구현되어 있는 화면을 신규 웹뷰 화면으로 전환</b>작업
            - Ckeditor를 사용해 에디터 구현.
            - <b>네이티브 앱 ios와 andriod 통신하는 appInterface 개발</b> 및 문서정리
            `
    },
    {
        projectTitle: 'Global IDO 토큰중개 서비스',
        projectGroup: 'Pandora.TV',
        period: '2022년 06월 - 2022년 08월',
        description: `web3를 사용한 지갑연동 및 상태 관리
            - i18n라이브러리를 접목하여 다국어 기능을 지원.
            - 자체토큰 스테이킹/거버넌스 기능
            `
    },
    {
        projectTitle: 'CATBOOK (SNS)',
        projectGroup: 'Evolve Branding',
        period: '2020년 04월 - 2020년 05월',
        description: `반려묘들을 위한 고양이 자랑 커뮤니티/SNS 서비스
        - <b>Newmorphic 커스텀 테마 위젯 모듈을 개발</b>해 전반적인 UI/UX 개발에 적용
        - Firebase를 사용해 <b>DB 구축 및 게시글 작성, 수정, 삭제, 조회 기능</b>을 구현 
        - <b>Firebase 의 authrozation 기능</b>을 사용해 회원가입/로그인 보안 강화
            `
    },
    {
        projectTitle: 'Evolve Store',
        projectGroup: 'Evolve Branding',
        period: '2020년 05월 - 2020년 06월, 2022년 07월 - 2022년 08월',
        description: `인턴십 프로그램에 참여하여 얻은 Score로 물품을 구매할 수 있는 인턴십 내 스토어 앱 개발

- firebase realtime 데이터베이스로 각 프로젝트 내의 채팅기능 개발
- 어드민에게만 프로젝트 생성 및 인턴 배정 권한을 부여
- <b>팀 리더로 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도</b>. 설계 기능의 기술적 타당성 및 최적화 할 수 있는 방안을 모색.
            `
    },
    {
        projectTitle: 'Dictionary & Translator',
        projectGroup: 'Evolve Branding',
        period: '2020년 06월 - 2020년 09월',
        description: `목소리를 인식하여 직역해주는 번역 프로그램 개발

- <b>google translator API</b>를 활용하여 직접 문장을 입력하여 번역기능을 제공하는 것을 베이스 개발
- 제공하는 10개 이상의 언어에서 <b>목소리 인식 번역 기능</b>을 추가를 위해 voice reconizer 패키지 접목.
- 번역 후 모르는 단어들은 바로 찾아볼 수 있도록 사전 기능을 제공 편리성을 개선.
            `
    },
    {
            projectTitle: '클로즈 샵(e-Commerce)',
            projectGroup: 'F9dev',
            period: '2018년 1월 - 2019년 01월',
            description: `<b>F9dev 자체 전자상거래 웹사이트</b>를 구축 및 운영.

    - 대규모 e-Commerce서비스로 성장하기 위한 디테일에 초점을 맞춰 개발
    - 느린 속도를 유발하는 <b>js 애니메이션을 css 애니메이션으로 교체</b>작업을 하여 라이트한 웹으로 퍼포먼스 개선
                `
        },
        {
            projectTitle: 'SPOTV (스포츠 스트리밍 서비스)',
            projectGroup: 'F9dev',
            period: '2018년 4월 - 2018년 7월',
            description: `SPOTV의 웹사이트와 하이브리드 앱 프론트엔드 개발

    - 넷플릭스의 참조해 전체적인 UI/UX를 디자인 및 구축
    - <b>앱에서 작동하는 웹 동작의 차이(터치 모션 등)를 축소하여 퍼포먼스 개선</b>
                `
        },
        {
            projectTitle: 'RnbStory Hybrid APP (SNS)',
            projectGroup: 'F9dev',
            period: '2018년 4월 - 2018년 6월',
            description: `RnbStory 웹사이트와 하이브리드 앱 프론트엔드 개발.

    - 유명한 SNS 웹사이트나 애플리케이션을 검토해 기술과 오픈 소스를 참조
    - 웹 사이트 정비를 위한 프런트 엔드 개발 및 지원 백엔드 프로그래밍을 주도했습니다. 설계 기능의 기술적 타당성 및 최적 기능 보장
                `
        },
        {
            projectTitle: 'BuyCar(중고차) Hybrid App',
            projectGroup: 'F9dev',
            period: '2017년 8월 - 2019년 01월',
            description: `자동차 중고거래 및 경매 플랫폼 운영 및 유지보수

    - <b>브랜드, 기능, 중고차의 구성 요소를 디자인적 요소로 구현하여 사용자에게 편리성을 제공</b> 
    - 경매가 입찰을 calculator 컴포넌트 간편사용을 위한 <b>일괄 증가, 현재가 기준 일정금액 증가 등 기능 개발</b>에 기여
                `
        },
        {
            projectTitle: '신한은행 임직원 강의 웹사이트 리뉴얼',
            projectGroup: 'Mayzen',
            period: '2016년 12월 - 2017년 12월',
            description: `- <b>SEO, 장애인을 위한 웹 접근성, 체계적인 구조를 갖춘 웹사이트 구축</b>
    - 유지보수를 위한 가이드 문서를 만들었습니다.
                `
        },
        {
            projectTitle: 'Hyundai Life web channel Construct',
            projectGroup: 'Mayzen',
            period: '2016년 8월 - 2016년 11월',
            description: `- UI개발에 넥사크로 사용 `
        },
        {
            projectTitle: '군인공제회 대학원 입학 홈페이지',
            projectGroup: 'Mayzen',
            period: '2017년 7월 - 2017년 8월',
            description: null
        },
        {
            projectTitle: '농협캐미컬 웹사이트 리뉴얼 UI 마크업 개발',
            projectGroup: 'Mayzen',
            period: '2016년 2월 - 2016년 4월',
            description: null
        },
]

export const otherprojects = [
    {
        projectTitle: 'NearBnb',
        period: '2021년 2월 - 2021년 4월',
        projectGroup: '개별 프로젝트',
        description: `현재 위치 기반의 숙소를 찾아 예약할 수 있는 서비스.
            - 호스트계정 - 원하는 기간에 숙소를 등록하는 기능에 기여(90%)
            - google map 기반의 좌표를 기반으로 내 위치 반경을 계산해 지도에 근처 숙소 노출 
            Java, Spring, Orqcle로 백앤드를 구축
        `
    },
    {
        projectTitle: 'C-It',
        period: '2021년 4월 - 2016년 6월',
        projectGroup: '개별 프로젝트',
        description: `IT 관련 주요 뉴스를 모아볼 수 있는 IT news 모아보기 커뮤니티
        - 뉴스등록을 위한 news 모델 설계
        - 커뮤니티 유저 회원가입을 위해 Mail 인증을 구현
        Java, Spring, Orqcle로 백앤드를 구축
        `
    },
]
</script>