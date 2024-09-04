import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    ${reset}

    @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
    .a11y-hidden {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
    }
    * {
        box-sizing: border-box;
        font-family: 'SpoqaHanSansNeo-Regular';
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
        padding: 0;
        margin: 0;
    }
    input {
        border: 0;
        background: transparent;
        margin: 0;
        padding: 0;
        outline: none;
    }

    html, body {
        height: 100%;
    }

    body {
        display: flex;
        flex-direction: column;
        background: var(--color-bg);
        font-family: 'SpoqaHanSansNeo-Regular';
    }


    :root {
        --color-white: #ffffff;
        --color-bg: #EDD0C2;
        --color-orange: #EC7E62;
        --color-red: #EB5757;
        --color-maroon: #A25956;
        --color-lightgrey: #f2f2f2;
        --color-partgrey: #e6e3dc;
        --color-grey: #c4c4c4;
        --color-darkgrey: #767676;
        --color-black: #000000;
    }

    
`;

export default GlobalStyles;
