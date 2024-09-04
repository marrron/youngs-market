import React from "react";
import styled from "styled-components";
import iconInsta from "../assets/images/icon-insta.svg";
import iconFb from "../assets/images/icon-fb.svg";
import iconYt from "../assets/images/icon-yt.svg";

export default function Footer() {
	return (
		// 아무거나
		<FooterStyle>
			<CorpAreaStyle>
				<ul className="corp-links">
					<li>
						<a>호두샵소개</a>
					</li>
					<li>
						<a>이용약관</a>
					</li>
					<li className="bold">
						<a>개인정보처리방침</a>
					</li>
					<li>
						<a>전자금융거래약관</a>
					</li>
					<li>
						<a>청소년보호정책</a>
					</li>
					<li>
						<a>제휴문의</a>
					</li>
				</ul>
				<ul className="social-links">
					<li>
						<a>
							<img src={iconInsta} alt="인스타" />
						</a>
					</li>
					<li>
						<a>
							<img src={iconFb} alt="페이스북" />
						</a>
					</li>
					<li>
						<a>
							<img src={iconYt} alt="유투브" />
						</a>
					</li>
				</ul>
			</CorpAreaStyle>
			<InfoAreaStyle>
				<ul>
					<li className="bold">
						<p>(주)HODU SHOP</p>
					</li>
					<li>
						<p>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</p>
					</li>
					<li>
						<p>사업자 번호: 000-0000-0000 | 통신판매업</p>
					</li>
					<li>
						<p>대표: 김영스</p>
					</li>
				</ul>
			</InfoAreaStyle>
		</FooterStyle>
	);
}

const FooterStyle = styled.footer`
	background-color: var(--color-partgrey);
	display: flex;
	flex-direction: column;
	padding: 60px 320px;
	position: relative;
`;

const CorpAreaStyle = styled.div`
	display: flex;
	justify-content: space-between;

	&::after {
		content: "";
		position: absolute;
		width: 100%;
		max-width: 1263px;
		height: 1px;
		top: 108px;
		background-color: #767676;
	}

	.corp-links {
		display: flex;
		gap: 32px;
		font-size: 14px;
		line-height: 35px;

		li {
			position: relative;

			&::before {
				content: "|";
				position: absolute;
				left: -16px;
				color: var(--color-darkgrey);
			}

			&:first-child::before {
				content: "";
			}
		}
	}

	.social-links {
		display: flex;
		gap: 32px;
		font-size: 14px;
		line-height: 35px;
		gap: 14px;
	}

	.bold {
		font-weight: bold;
	}
`;

const InfoAreaStyle = styled.div`
	font-size: 14px;
	color: #767676;
	line-height: 30px;
	padding-top: 30px;
`;
