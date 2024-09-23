import Logo from "../../assets/images/BrandLogo.png"
import Banner from "../../assets/images/sideimg.jpg"

export const Appstore = () => {
  return (
    <div className="appstore">
    <div className="appstore__info">
      <div className="appstore__info__container">
        <div className="appstore__info_header">
          <div className="appstore__info_header_logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="appstore__info_header_slogan">
            Your Digital Growth Partner
          </div>
        </div>
        <div className="appstore__info_title">We are launching soon!</div>

        {/* <div className="appstore__info_time">
          <div className="appstore__clock">
            <div className="appstore__clock_time">
              <span className="appstore__clock_time_days"></span>
              <small>Days</small>
            </div>
            <div className="appstore__clock_time">
              <span className="appstore__clock_time_hours"></span>
              <small>Hours</small>
            </div>
            <div className="appstore__clock_time">
              <span className="appstore__clock_time_minutes"></span>
              <small>Minutes</small>
            </div>
            <div className="appstore__clock_time">
              <span className="appstore__clock_time_seconds"></span>
              <small>Seconds</small>
            </div>
          </div>
        </div> */}
        {/* <div className="appstore__info_form">
          <div className="appstore__info_form_title"></div>
          <div className="appstore__info_form_form">
            <input type="text" className="appstore__info_form_input" placeholder="Your email address" />
            <button type="button" className="appstore__info_form_button"><i className="icon icon-envelope"></i><span>NOTIFY ME</span></button>
          </div>
        </div> */}
        {/* <div className="appstore__info_footer">
          <div className="appstore__info_footer_social">
            <ul>
              <li><a href="#"><i className="icon icon-facebook"></i></a></li>
              <li><a href="#"><i className="icon icon-github"></i></a></li>
              <li><a href="#"><i className="icon icon-google-plus"></i></a></li>
              <li><a href="#"><i className="icon icon-linkedin"></i></a></li>
              <li><a href="#"><i className="icon icon-twitter"></i></a></li>
            </ul>
          </div>
          <div className="appstore__foioter_copyright">
            <p>
              Copyright &copy; 
              <a href="https://uzo.co.in" target="_blank">Uzo - Marketplace</a>
              2024.
            </p>
          </div>
        </div> */}
      </div>
    </div>
    <div className="appstore__banner">
      <img src={Banner} alt="wallpaper" />
    </div>

      {/* <div className="row">
        <div className="col-8">
          <div className="container">
            <header id="header">
              <div className="logo">
                <img src={Logo} alt="logo" />
              </div>
            </header>
            <div className="main-content">

              <div className="page-title">

                <h1>We are launching soon!</h1>

                <div id="countdown-clock">
                  <div className="time">
                    <span className="days"></span>
                    <small>Days</small>
                  </div>
                  <div className="time">
                    <span className="hours"></span>
                    <small>Hours</small>
                  </div>
                  <div className="time">
                    <span className="minutes"></span>
                    <small>Minutes</small>
                  </div>
                  <div className="time">
                    <span className="seconds"></span>
                    <small>Seconds</small>
                  </div>
                </div>

              </div>

              <form id="form">

                <p>Get notified when we launched our website</p>

                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Your email address" />
                  <button type="button" className="submit-button"><i className="icon icon-envelope"></i><span>NOTIFY ME</span></button>
                </div>

              </form>

            </div>

            <footer id="footer">

              <div className="social-links">
                <ul>
                  <li><a href="#"><i className="icon icon-facebook"></i></a></li>
                  <li><a href="#"><i className="icon icon-github"></i></a></li>
                  <li><a href="#"><i className="icon icon-google-plus"></i></a></li>
                  <li><a href="#"><i className="icon icon-linkedin"></i></a></li>
                  <li><a href="#"><i className="icon icon-twitter"></i></a></li>
                </ul>
              </div>

              <div className="copyright">
                <p>
                  Copyright &copy; 
                  <a href="https://uzo.co.in" target="_blank">Uzo - Maraketplace</a>
                  2024.
                </p>

              </div>

            </footer>

          </div>
        </div>

        <div className="col-4">
          <img src={Banner} alt="wallpaper" className="sideimg" />
        </div>
      </div> */}

    </div>

  )
}