import { Link } from "react-router-dom";
import StatsText from "./StatsText";

export default () => {

  return (
    <div className="container">
      <StatsText />

      <div className="accordion mb-3" id="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              <strong>Supported Games</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion">
            <div className="accordion-body">
              <b>These are the supported games:</b>
              <ul>
                <li>Battlefield 2042</li>
                <li>Battlefield V + Firestorm</li>
                <li>Battlefield 1</li>
                <li>Battlefield Hardline</li>
                <li>Battlefield 4</li>
                <li>Battlefield 3</li>
                <li>Battlefield Bad Company 2</li>
                <li>Battlefield 2</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>Commands</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
            <div className="accordion-body">
              <b>These are the available commands:</b>
              <ul>
                <li>/bf2042</li>
                <li>/bfv</li>
                <li>/bf1</li>
                <li>/bfh</li>
                <li>/bf4</li>
                <li>/bf3</li>
                <li>/bfbc2</li>
                <li>/bf2</li>
                <li>/about</li>
                <li>/help</li>
                <li>/feedback</li>
                <li>/invite</li>
              </ul>
              You can run <b>/help</b> to get a full list.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>PSA & Credits</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
            <div className="accordion-body">
              <p>This bot is not endorsed by, supported by, or affiliated with EA, DICE or any EA entity.
                All images displayed in this bot and its output are properties of EA/DICE. The bot uses
                stats from <a className="link-primary fw-bold" href="https://battlefieldtracker.com?utm_source=discord&utm_medium=full-stats&utm_campaign=mozzy-bot">Tracker Network</a> and <a className="link-primary fw-bold" href="https://gametools.network">Community Network</a>. This is not possible without these services.
                <br />
                Read the <Link to="/privacy" className="link-primary fw-bold">Privacy Policy</Link> and <Link to="/tos" className="link-primary fw-bold">Terms of Service</Link>.
                <br /><br />
                Massive thanks to all the community translators: Sephi, PierrotL'Asticot, Matteo 'Forever.exe' Besutti, Navigando, Salty Tenten, Rephii, CaptPerry, TheLetslook, Szymon Olejniczak, Rubinsk, VIP-AHMAD-007, PeterSMK2, TR-BatuhanKara, Arall, Pug, Klikard, Dragory
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3>Image Gallery</h3>

      <div id="imageCarousel" className="carousel slide mb-3" data-bs-ride="false">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" className="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="3"
            aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="4"
            aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="5"
            aria-label="Slide 6"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="6"
            aria-label="Slide 7"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="7"
            aria-label="Slide 8"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="8"
            aria-label="Slide 9"></button>
          <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="9"
            aria-label="Slide 10"></button>
        </div>

        <div className="carousel-inner rounded">
          <div className="carousel-item active">
            <img src="/assets/images/example_bf2042.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bfv.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bf1.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bfh.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bf4.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bf3.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bfbc2.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bf2.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bf2042w.png" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/assets/images/example_bf1v.png" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  );
};