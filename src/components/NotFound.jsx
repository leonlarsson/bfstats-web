import StatsText from "./StatsText";

const NotFound = () => {
  return (
    <div className="container text-center">
      <StatsText />
      <hr />

      <img src="https://api.onlyraccoons.com/404" />
      <br />
      <a className="h3 link-primary" href="/">Back to main page</a>
    </div>
  );
};

export default NotFound;