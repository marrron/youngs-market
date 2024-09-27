# 🛒YOUNGS MARKET

## 소개 및 개요
* 프로젝트 기간 : 2024. 07. 08 ~ 2024. 09. 27
* 배포 URL: [🔗YOUNGS MARKET](https://youngs-market.netlify.app/)
* 테스트 계정
  
| 유형 | Test ID | PW |
| ------ | ------ |------ |
| 구매자 | `youngs_buyer1@youngsmarket.com` |youngs0720|
| 판매자 | `youngs_seller1@youngsmarket.com`|youngs0720|

## 프로젝트 설명
* YOUNGS MARKET 서비스는 판매자와 구매자를 구별하여 판매자가 상품을 등록, 판매하여 구매자는 구매하는 서비스입니다.
* React를 사용하여 회원가입, 로그인, 상품 CRUD, 결제를 직접 구현해보는 프로젝트입니다.
* 상품을 판매하려고 한다면 판매자로 로그인하여 상품 정보를 등록 및 수정할 수 있습니다. 판매자가 상품을 구매하는 것은 불가능합니다. 오픈마켓에 등록되어 있는 상품을 구매하고자 한다면 상품의 세부사항을 확인한 뒤, 장바구니에 넣어, 상품을 구매할 수 있습니다.
* 기존에는 제공된 API를 사용하여 백엔드 부분을 구현하였으나 API 제공 종료로 인해 Firebase를 사용하여 백엔드 부분을 재구현하였습니다.

## 목차
1.[ 팀 소개](#1-팀-소개)  
2.[ 기술 및 개발 환경](#2-기술-및-개발-환경)  
3.[ 주요 기능](#3-주요-기능)  
4.[ 프로젝트 구조](#4-프로젝트-구조)  
5.[ 역할 분담](#5-역할-분담)  

## 1. 팀 소개


안녕하세요. 저희는 2명의 Front-end 개발자로 구성된 YOUNGS 입니다.  
|**김서영**|**방지영**|
| :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | 
| <img width="180" alt="seoyoung-kim_profile_img" src="https://avatars.githubusercontent.com/u/124869695?v=4"> | <img width="180"  alt="seoyoung-kim_profile_img" src="https://avatars.githubusercontent.com/u/112460285?v=4"> | 
| [seoyoung-kim](https://github.com/doong2imdang) |  [jiyoung-bang](https://github.com/marrron)|


## 2. 기술 및 개발 환경
<table class="tg">
<tbody>
   <tr>
    <td class="tg-0pky">개발 환경 FE<br></td>
    <td class="tg-0pky"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/context API-83B81A?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<br></td>
  </tr>
   <tr>
    <td class="tg-0pky">개발 환경 BE<br></td>
    <td class="tg-0pky"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"></td>
  </tr>
  <tr>
    <td class="tg-0pky">버전 및 이슈 관리</td>
    <td class="tg-0pky"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"></td>
  </tr>
  <tr>
    <td class="tg-0pky">프로젝트 관리</td>
    <td class="tg-0pky"><img src="https://img.shields.io/badge/github pull requests-181717?style=for-the-badge&logo=github&logoColor=white"></td>
  </tr>
  <tr>
    <td class="tg-0pky">커뮤니케이션</td>
    <td class="tg-0pky"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></td>
  </tr>
  <tr>
    <td class="tg-0pky">배포</td>
    <td class="tg-0pky"><img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"></td>
  </tr>
</tbody>
</table>

## 3. 주요 기능
### [공통]
### 🔒 로그인 / 회원가입
* 로그인 및 회원가입 기능(유효성 검사 포함)
* 구매자 / 판매자 각각 로그인 및 회원가입 
  
### [구매자]
### 👜 장바구니
* 상품 담기
* 장바구니 상품 수량 수정 및 삭제 

### ✒️ 주문하기
* 장바구니 상품/ 상품 상세페이지 상품 주문
* 배송 정보 입력 후 결제

### [판매자]
### 🖼 상품 등록
* 상품 등록
* 상품 수정
* 상품 삭제

<table>
    <tbody>
        <tr></tr>
        <tr>
            <th>시연</th>
            <th>설명</th>
        </tr>
        <tr>
            <td><img src="https://github.com/user-attachments/assets/269786a1-262d-4b68-ba5d-6daec0708322"
                  width="800px"  alt=""></td>
            <td>판매회원 로그인<ul>
                    <li>판매 회원 로그인</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## 4. 프로젝트 구조
```
youngs market
├─ .github
│  └─ pull_request_template.md ------------- 🔖 PR 템플릿
├─ .gitignore
├─ 📌 README.md
├─ package-lock.json
├─ package.json
├─ 📁 public
│  ├─ _redirects
│  └─ index.html
└─ 📁 src
   ├─ App.js
   ├─ index.js
   ├─ firebase.jsx
   ├─ 📁 assets ---------------------------- 🗓️ 정적 데이터 모음
   ├─ 📁 components
   ├─ 📁 pages ----------------------------- ⚛️ 페이지 폴더
   ├─ 📁 routes ---------------------------- 🧭 라우터 설정 폴더
   ├─ 📁 style ----------------------------- 💄 스타일 설정 폴더
   └─ 📁 context ------------------------------ ⚛️ Context API 폴더
```

## 5. 역할 분담
### 김서영
* 상품 목록 페이지
* 상품 상세 페이지
* 장바구니 페이지
* 주문/결제 페이지
* 상품 등록 페이지
  
### 방지영
* 로그인 페이지
* 회원가입 페이지
* 마이페이지
* 404 페이지


