/* eslint-disable react/jsx-no-target-blank */
import StatsText from "./StatsText";

export default () => {
  return (
    <div className="container">
      <StatsText />
      <hr />

      <h1 className=" text-decoration-underline">Terms of Service</h1>
      <h5>(Updated March 6, 2022)</h5>

      <div className="pb-3">
        <h2>By using this service, you agree to the below points:</h2>
        <ul>
          <li>You will not abuse this bot or spam requests.</li>
          <li>You will not use this bot to harass people.</li>
          <li>You will not use this bot to violate EA's or Discord's Terms of Service or Community Guidelines.</li>
          <li>You will not use this bot for any illegal activities.</li>
        </ul>
      </div>
      <h3 className="text-decoration-underline">I reserve the right to block any person and/or server whenever I wish, for reasons including (but not limited to) the points above.
      </h3>
    </div>
  );
};