<template>
  <div class="logo">
    <div class="logo__item">
      <a
        href="https://apps.apple.com/vn/app/whiteg/id1643640629"
        target="_blank"
        ><img src="../../../public/AppStore.svg" alt="Apple Store"
      /></a>
    </div>
    <div class="logo__item">
      <a
        href="https://play.google.com/store/apps/details?id=com.taki.lgbt.whiteg&referrer=utm_source%3DFB-Landing%2520page%26utm_medium%3DDoanh%2520so%26utm_term%3DContent%2520no%2520hate"
        target="_blank"
        ><img src="../../../public/PlayStore.svg" alt="Google Play"
      /></a>
    </div>
  </div>

  <div class="footer">
    <div class="body_container">
      <div class="footer__top">
        <div class="footer__top__left">
          <div class="footer__top__left__item col-6 col-md-4">
            <div class="footer__top__left__item__heading">ABOUT WHITEG</div>
            <div class="footer__top__left__item__desc">
              <a href="/page/about-us">About Us</a>
            </div>
            <div class="footer__top__left__item__desc">
              <a href="/page/about-us#security"
                >Your safety & security matters</a
              >
            </div>
            <div class="footer__top__left__item__desc">
              <a href="/page/about-us#customer-support">Customer Support</a>
            </div>
            <div class="footer__top__left__item__desc">
              <a href="/page/video-policy">Video policy</a>
            </div>
          </div>

          <div class="footer__top__left__item col-6 col-md-4">
            <div class="footer__top__left__item__heading">HOW IT WORKS</div>
            <div class="footer__top__left__item__desc">
              <a href="/page/how-it-work">Getting Started</a>
            </div>
            <div class="footer__top__left__item__desc">
              <a href="/page/cookies-policy">Cookies Policy</a>
            </div>
            <div class="footer__top__left__item__desc">
              <a href="/page/how-it-work#refund">Refund Policy</a>
            </div>
            <div class="footer__top__left__item__desc">
              <router-link :to="'/article'">Articles</router-link>
            </div>
          </div>

          <div class="footer__top__left__item col-6 col-md-4">
            <div class="footer__top__left__item__heading">HOW WE CAN HELP</div>
            <div class="footer__top__left__item__desc">
              <a href="/FAQ">FAQ</a>
            </div>
            <div class="footer__top__left__item__desc">
              <router-link :to="'/events'">Events</router-link>
            </div>
            <div class="footer__top__left__item__desc">
              <a href="/contact">Contact Us</a>
            </div>
            <div class="footer__top__left__item__desc">
              <a href="/remove-user">Remove User</a>
            </div>
          </div>
        </div>
        <div class="footer__top__right">
          <div class="footer__top__right__button">
            <div class="footer__top__right__button__item">
              <a
                href="https://apps.apple.com/vn/app/whiteg/id1643640629"
                target="_blank"
                ><img src="../../../public/AppStore.svg" alt="Apple Store"
              /></a>
            </div>
            <div class="footer__top__right__button__item">
              <a
                href="https://play.google.com/store/apps/details?id=com.taki.lgbt.whiteg&referrer=utm_source%3DFB-Landing%2520page%26utm_medium%3DDoanh%2520so%26utm_term%3DContent%2520no%2520hate"
                target="_blank"
                ><img src="../../../public/PlayStore.svg" alt="Google Play"
              /></a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__bottom__left">
          © 2022 whiteg.appuni.io is operated by ICEO inc.<br />
          * All prices are listed in coin credits. One coin credit is equivalent
          to $0.1 USD. Psychics are not employees or representatives of WhiteG.
        </div>
        <div class="footer__bottom__right">
          <div class="footer__bottom__right__heading">WE ACCEPT</div>
          <div class="footer__bottom__right__block">
            <div class="footer__bottom__right__block__item">
              <img src="../../../public/visa.svg" alt="Visa" />
            </div>
            <div class="footer__bottom__right__block__item">
              <img src="../../../public/mastercard.svg" alt="Mastercard" />
            </div>
            <div class="footer__bottom__right__block__item">
              <img src="../../../public/paypal.svg" alt="Paypal" />
            </div>
            <div class="footer__bottom__right__block__item">
              <img src="../../../public/bitcoin.svg" alt="Bitcoin" />
            </div>
          </div>
        </div>
        <div class="footer__bottom__left">
          <p>Use of this site is subject to the</p>
          <a href="/page/terms">Terms of Use</a>
          <a href="/page/policies">Privacy Policy</a>
          <a href="/page/disclaimer">Disclaimer</a>
        </div>
        <div class="footer__bottom__right">
          <div class="footer__bottom__right__svg">
            <a
              href="https://www.facebook.com/whiteG.gaychat.call"
              target="_blank"
              rel="nofollow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                />
              </svg>
            </a>
          </div>
          <div class="footer__bottom__right__svg">
            <a
              href="https://twitter.com/whiteGappinio"
              target="_blank"
              rel="nofollow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                />
              </svg>
            </a>
          </div>
          <div class="footer__bottom__right__svg">
            <a
              href="https://www.instagram.com/whiteg.gaychat.call"
              target="_blank"
              rel="nofollow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
@import "../../assets/scss/main.scss";

.logo {
  // width: 100%;
  float: left;
  display: none;

  @include breakpoint(phablet) {
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    // margin: auto;
    // position: absolute;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    z-index: 999;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    justify-content: center;
  }

  &__item {
    max-width: calc(50% - 10px);
    // width: auto;
    float: right;
    // margin-left: 10px;
    display: block;
    margin: auto;

    @include breakpoint(phablet) {
      float: left;
      margin-right: 10px;
      margin-left: 0;
    }

    // img {
    //   width: 100%;
    // }
  }
}

.footer {
  background-color: #222;
  width: 100%;
  float: left;
  min-height: 400px;
  padding-bottom: 40px;

  &__top {
    width: 100%;
    float: left;
    // padding: 0 0 40px 0;
    padding-bottom: 40px;

    &__left {
      width: 70%;
      float: left;
      min-width: 70%;

      @include breakpoint(phablet) {
        width: 100%;
      }

      &__item {
        float: left;
        padding-right: 20px;

        @include breakpoint(phablet) {
          padding-right: 20px;
        }

        &__heading {
          width: 100%;
          font-size: 14px;
          font-weight: 700;
          color: #f0f0f0;
          float: left;
          padding: 10px 0;
        }

        &__desc {
          font-size: 13px;
          font-weight: 400;
          color: #aaa;
          width: 100%;
          float: left;
          padding: 2px 0;
          cursor: pointer;
          user-select: none;

          a {
            color: #aaa;
            text-decoration: none;

            &:hover {
              color: #fff;
              text-decoration: none;
            }
          }
        }
      }
    }

    &__right {
      width: 30%;
      float: right;
      padding-left: 40px;
      padding-top: 10px;

      @include breakpoint(phablet) {
        width: 100%;
        padding-left: 0;
        padding-top: 20px;

        // position: absolute;
        // position: sticky;
        // bottom: 0;
        // z-index: 999;
        // width: 100%;
      }

      &__button {
        width: 100%;
        float: left;

        @include breakpoint(phablet) {
          display: flex;
          justify-content: center;
        }

        &__item {
          max-width: calc(50% - 10px);
          width: auto;
          float: right;
          margin-left: 10px;

          @include breakpoint(phablet) {
            float: left;
            margin-right: 10px;
            margin-left: 0;
          }

          img {
            width: 100%;
          }
        }
      }
    }
  }

  &__bottom {
    width: 100%;
    float: left;

    &__left {
      width: 70%;
      float: left;
      color: #aaa;
      font-weight: 400;
      padding-right: 30px;
      font-size: 13px;

      @include breakpoint(phablet) {
        width: 100%;
        padding-right: 0;
      }

      p {
        float: left;
        width: 100%;
        margin-right: 8px;
      }

      a {
        float: left;
        margin-right: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        color: #aaa;
        text-decoration: none;

        &:hover {
          color: #fff;
          text-decoration: none;
        }
      }
    }

    &__right {
      width: 30%;
      float: left;

      @include breakpoint(phablet) {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
      }

      &__svg {
        margin-top: 30px;
        width: 26px;
        height: 26px;
        float: right;
        margin-left: 16px;
        cursor: pointer;
        user-select: none;

        svg {
          fill: #aaa;
        }
      }

      &__heading {
        width: 100%;
        float: left;
        font-size: 14px;
        color: #aaa;
        font-weight: 700;
        padding-bottom: 8px;
      }

      &__block {
        width: calc(100% + 8px);
        margin-left: -8px;
        margin-right: -8px;

        &__item {
          width: calc(25% - 8px);
          float: left;
          margin: 4px;
          cursor: pointer;
          user-select: none;

          @include breakpoint(phablet) {
            width: 60px;
          }

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }

  // .footer_mobile_menu {
  //   position: -webkit-sticky;
  //   position: sticky;
  //   top: 0;
  // }
}
</style>
