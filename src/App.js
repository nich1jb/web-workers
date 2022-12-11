import styled from "styled-components";
import logo from "./logo.svg";
import Timer from "./Timer";

const MainWrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Logo = styled.img`
  height: 80px;
`;

const App = () => (
  <MainWrapper>
    <Header>
      <Logo src={logo} alt="logo" />
      <h1>Web Worker Demo</h1>
    </Header>
    <section className="App-intro">
      <Timer />
    </section>
  </MainWrapper>
);

export default App;
