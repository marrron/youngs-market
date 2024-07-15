import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import eventBanner1 from "../assets/images/event-banner-1.svg";
import eventBanner2 from "../assets/images/event-banner-2.svg";
import eventBanner3 from "../assets/images/event-banner-3.svg";
import eventBanner4 from "../assets/images/event-banner-4.svg";
import eventBanner5 from "../assets/images/event-banner-5.svg";
import iconSwiper1 from "../assets/images/icon-swiper-1.svg";
import iconSwiper2 from "../assets/images/icon-swiper-2.svg";

export default function Main() {
  return (
    <>
      <Header />
      <main>
        <ImageSliderStyle>
          <div className="images-box">
            <img src={eventBanner1} alt="이벤트배너" />
            <img src={eventBanner2} alt="이벤트배너" />
            <img src={eventBanner3} alt="이벤트배너" />
            <img src={eventBanner4} alt="이벤트배너" />
            <img src={eventBanner5} alt="이벤트배너" />
          </div>
          <BtnImagesSliderStyle>
            <button className="btn-left-swiper" type="button">
              <img src={iconSwiper1} alt="이미지슬라이더좌측버튼" />
            </button>
            <button className="btn-right-swiper" type="button">
              <img src={iconSwiper2} alt="이미지슬라이더우측버튼" />
            </button>
          </BtnImagesSliderStyle>
          <BtnDotsStyle>
            <button className="dot dot-active" type="button"></button>
            <button className="dot" type="button"></button>
            <button className="dot" type="button"></button>
            <button className="dot" type="button"></button>
            <button className="dot" type="button"></button>
          </BtnDotsStyle>
        </ImageSliderStyle>
        <ProductsContainerStyle></ProductsContainerStyle>
      </main>
      <Footer />
    </>
  );
}

const ImageSliderStyle = styled.div`
  min-width: 300px;
  overflow: hidden;
  position: relative;

  .images-box {
    display: flex;
    transition: all 1s;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const BtnImagesSliderStyle = styled.div`
  .btn-left-swiper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-right-swiper {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;

const BtnDotsStyle = styled.div`
  position: absolute;
  left: 50%;
  bottom: 18px;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50px;
    background-color: #fff;
    padding: 0;
    margin-right: 5px;
  }

  .dot-active {
    background-color: #000;
  }
`;

const ProductsContainerStyle = styled.ul`
  display: grid;

  .product {
    display: flex;
    flex-direction: column;
  }

  .product-image {
    width: 380px;
    height: 380px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    border: 1px solid #c4c4c4;
  }

  .products-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 49px;
    padding: 80px 300px 180px 300px;
  }

  .product-image img:hover,
  .store-name:hover,
  .product-name:hover {
    opacity: 0.6;
  }

  .store-name {
    color: #767676;
    font-size: 16px;
    padding-top: 16px;
    cursor: pointer;
  }

  .product-name {
    color: #000;
    font-size: 18px;
    padding: 10px 0 10px 0;
    cursor: pointer;
  }

  .product-price {
    color: #000;
    font-size: 24px;
    font-weight: bold;
  }

  .soldout-image {
    width: 125px;
    padding-bottom: 5px;
  }
`;
