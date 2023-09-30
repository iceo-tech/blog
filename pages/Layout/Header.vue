<template>
  <header class="header">
    <div class="container">
      <div class="header_web_menu">
        <div class="row">
          <div class="header__logo">
            <router-link :to="'/'">
              <div class="header__logo__block">
                <!-- <img src="../../../public/homepage_app_logo.webp" /> -->
              </div>
            </router-link>
          </div>

          <div class="col">
            <a class="menu__link" href="https://appuni.io/">Carrers</a>
          </div>

          <div class="col">
            <a class="menu__link" href="/article">Articles</a>
          </div>
          <!-- <div class="col"> <a class="menu__link" href="/event">Events</a></div> -->
          <div class="col">
            <a class="menu__link" href="/contact">Contact</a>
          </div>
        </div>
      </div>

      <div class="header_mobile_menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          v-on:click="handleOpenPopup"
        >
          <path
            d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
          />
        </svg>

        <div class="header_mobile__tool_menu" v-if="openPopup">
          <div class="header_mobile__tool_menu__header">
            <div class="header__logo">
              <a href="/">
                <div class="header__logo__block">
                  <!-- <img src="../../../public/homepage_app_logo.webp" /> -->
                </div>
              </a>
            </div>
          </div>

          <ul class="list-group">
            <a class="menu__link" href="https://appuni.io/">
              <li class="list-group-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z"
                  />
                </svg>
                Carrers
              </li>
            </a>
            <a class="menu__link" href="/article">
              <li class="list-group-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M180.5 141.5C219.7 108.5 272.6 80 336 80C399.4 80 452.3 108.5 491.5 141.5C530.5 174.5 558.3 213.1 572.4 241.3C577.2 250.5 577.2 261.5 572.4 270.7C558.3 298 530.5 337.5 491.5 370.5C452.3 403.5 399.4 432 336 432C272.6 432 219.7 403.5 180.5 370.5C164.3 356.7 150 341.9 137.8 327.3L48.12 379.6C35.61 386.9 19.76 384.9 9.474 374.7C-.8133 364.5-2.97 348.7 4.216 336.1L50 256L4.216 175.9C-2.97 163.3-.8133 147.5 9.474 137.3C19.76 127.1 35.61 125.1 48.12 132.4L137.8 184.7C150 170.1 164.3 155.3 180.5 141.5L180.5 141.5zM416 224C398.3 224 384 238.3 384 256C384 273.7 398.3 288 416 288C433.7 288 448 273.7 448 256C448 238.3 433.7 224 416 224z"
                  />
                </svg>
                Articles
              </li>
            </a>
            <!-- <router-link :to="'/event'">
              <li class="list-group-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
                </svg>
                Events
              </li>
            </router-link> -->
            <router-link :to="'/contact'">
              <li class="list-group-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"
                  />
                </svg>
                Contact
              </li>
            </router-link>
          </ul>
        </div>
        <div
          class="header_mobile_menu__bg"
          v-on:click="handleOpenPopup"
          v-if="openPopup"
        ></div>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      openPopup: false,
    };
  },
  methods: {
    handleOpenPopup() {
      this.openPopup = !this.openPopup;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/main.scss";

.header {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-family: $fontFamily;
  text-align: center;
  font-size: 24px;
  padding: 10px;
  top: 0;
  left: 0;
  z-index: 999;
  // position: sticky;
  top: 0;
  position: fixed;
  width: 100%;
  display: none;

  .container {
    margin: 0 auto;
    // margin-top: 80px;
    position: relative;
    // background-color: $backgroundColor;
    padding: 0;

    @include breakpoint(laptop) {
      width: 1100px;
      padding: 0 20px;
      max-width: 1100px;
    }

    @include breakpoint(tablet) {
      width: 1100px;
      max-width: 1100px;
      padding: 0 20px;
    }

    @include breakpoint(phablet) {
      width: 100%;
      padding: 0 20px;
    }
  }

  &.hidden {
    height: 70px;

    @include breakpoint(phablet) {
      height: 60px;
    }
  }

  @include breakpoint(phablet) {
    height: 60px;
    // display: none;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .col {
      margin-top: 10px;
    }
  }

  &__link {
    text-decoration: none;
    color: #fff;

    &:hover {
      text-decoration: none;
      color: #fff;
    }
  }

  a {
    font-weight: 900;
    color: $textColor;
    font-family: $fontFamily;
  }

  .header_web_menu {
    @include breakpoint(phablet) {
      float: right;
      // width: 90%
      width: calc(80%);
    }

    .menu__link {
      @include breakpoint(phablet) {
        display: none;
      }
    }

    .header__logo {
      width: 200px;
      float: left;
      margin: 10px 0 0 0;

      @include breakpoint(phablet) {
        width: 200px;
        margin: 0 auto;
        float: unset;
        display: inline;
        text-align: center;
        align-items: center;
        width: 100%;
      }

      &__block {
        width: 40px;
        height: 40px;
        float: left;
        border-radius: 10px;
        margin-top: 4px;

        img {
          height: 40px;
          width: auto;
          margin: -20px 12px 5px;
          text-align: center;
          align-items: center;
        }

        @include breakpoint(phablet) {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-top: 0px;
          display: inline;
          text-align: center;
          margin: 0 auto;
          float: unset;

          img {
            height: 50px;
            width: auto;
            margin: -10px 12px 5px;
            text-align: center;
            align-items: center;
          }
        }
      }
    }
  }

  .header_mobile_menu {
    display: none;
    position: absolute;
    top: 0;
    left: 2px;
    width: 40px;
    height: 40px;
    // margin: 10px;
    border-radius: 10px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;

    &:hover {
      background-color: $primaryBackground;
    }

    svg {
      width: 20px;
      height: 20px;
      margin: 10px;
      fill: #888;
    }

    @include breakpoint(phablet) {
      display: block;
      float: left;
    }

    &__bg {
      width: 100%;
      position: fixed;
      top: 90px;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 10000;

      @include breakpoint(phablet) {
        top: 60px;
      }
    }
  }

  ul.list-group {
    overflow-y: auto;
    padding: 0 16px;

    @include breakpoint(phablet) {
      height: calc(100% - 130px);
      padding-bottom: 40px;
      width: calc(100% + 20px);
      margin-right: -20px;
      padding: 0;
      padding-right: 20px;
    }
  }

  .list-group-item {
    cursor: pointer;
    user-select: none;
    font-weight: 900;
    padding: 0px 8px !important;
    border: 0 !important;
    color: $textColor;
    background: $backgroundColor;
    font-size: 20px;

    @include breakpoint(phablet) {
      padding: 10px 0 !important;
      border: none;
      border-bottom: 1px #efefef solid !important;
    }

    svg {
      width: 18px;
      margin-right: 8px;
      margin-top: -2px;
      fill: $textColor;
    }

    &:hover {
      background-color: $primaryBackground;
    }
  }

  .header__logo {
    width: 200px;
    float: left;
    margin: 10px 0 0 0;
    // display: none;

    @include breakpoint(phablet) {
      width: 200px;
      margin: 0 auto;
      float: unset;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    p {
      font-weight: 900;
      font-size: 20px;
      color: $primaryColor;
      line-height: 50px;
      float: left;
      margin-left: 8px;
      letter-spacing: -1px;

      @include breakpoint(phablet) {
        line-height: 40px;
      }
    }

    &__block {
      width: 40px;
      height: 40px;
      float: left;
      // background-color: $primaryColor;
      border-radius: 10px;
      margin-top: 4px;

      img {
        height: 50px;
        width: auto;
        margin: -20px 12px 5px;
      }

      @include breakpoint(phablet) {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-top: 0px;

        img {
          height: 50px;
          width: auto;
          margin: 0px 12px;
        }
      }
    }
  }

  .header_mobile__tool_menu {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 250px;
    margin: 0px;
    box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
    background: $backgroundColor;
    padding: 20px;
    z-index: 10000000000;

    @include breakpoint(phablet) {
      display: block;
    }

    &__header {
      border-bottom: 1px #efefef solid;
      height: 70px;

      &__footer {
        height: 60px;
        bottom: 0;
        padding: 8px 20px 0px 20px;
        width: 300px;
        left: 0;
        right: 0;
        position: absolute;
        width: 100%;
        border-top: 1px #efefef solid;

        .col {
          padding: 4px !important;
        }

        &__border {
          width: 100%;
          float: left;
        }

        &__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          float: left;

          img {
            width: 40px;
            height: 40px;
            object-fit: cover;
          }
        }

        &__name {
          width: calc(100% - 40px - 70px);
          float: left;
          padding: 0 8px;

          &__title {
            font-weight: 900;
            font-size: 14px;
            margin-top: -4px;
            color: $textColor;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          &__desc {
            width: 100%;
            color: #aaa;
            font-size: 12px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }

        &__button {
          width: 70px;
          float: left;

          button {
            font-size: 10px;
            font-weight: 900;
            margin-top: 2px;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>
