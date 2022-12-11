import { useState, useEffect } from "react";
import ReactCountdownClock from "react-countdown-clock";
import styled from "styled-components";
import WebWorker from "./webWorkerSetup";
import worker from "./worker";

const noWebWorkerColour = "#000";
const webWorkerColour = "#e56";

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Timer = styled.div`
  width: 600px;
  padding: 20px 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  ${UserInfo};
  padding: 10px 0;
`;

const FetchButton = styled.button`
  background-color: ${(props) =>
    props.webWorker ? webWorkerColour : noWebWorkerColour};
  color: #fff;
  padding: 10px 20px;
  border: none;
  font-size: 15px;
  border-radius: 2px;
  cursor: pointer;
`;

const Home = () => {
  const [userCount, setUserCount] = useState(0);

  const webWorker = new WebWorker(worker);

  const fetchNoWebWorker = () => {
    const randomIntFromInterval = (min, max) => {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const rndInt = randomIntFromInterval(10000000, 30000000);

    const users = [];

    const userDetails = {
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      id: 1,
    };

    for (let i = 0; i < rndInt; i++) {
      userDetails.id = i++;
      userDetails.dateJoined = Date.now();

      users.push(userDetails);
    }

    setUserCount(users.length);
  };

  return (
    <TimerWrapper>
      <UserInfo>
        <h1>Total User Count: {userCount}</h1>
      </UserInfo>
      <Timer>
        <ReactCountdownClock
          seconds={100}
          color={noWebWorkerColour}
          alpha={0.9}
          size={300}
        />
      </Timer>
      <ButtonWrapper>
        <FetchButton onClick={fetchNoWebWorker} webWorker={false}>
          Fetch Users Directly
        </FetchButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <FetchButton
          onClick={() => {
            webWorker.postMessage("Fetch Users");

            webWorker.addEventListener("message", (event) => {
              setUserCount(event.data);
            });
          }}
          webWorker={true}
        >
          Fetch Users With Web Worker
        </FetchButton>
      </ButtonWrapper>
    </TimerWrapper>
  );
};

export default Home;
