import "./App.css";
import {
  Container,
  Row,
  Button,
  Spinner,
  Navbar,
  Nav,
  Col,
  NavDropdown,
} from "react-bootstrap";
import { useMetaMask } from "metamask-react/lib/use-metamask";
const chainMap = [
  {id:"0x38", img: "bsc", label: "Binance Smart Chain (BSC)"},
  {id:"0x1", img: "eth", label: "Ethereum (ETH)"},
  {id:"0xa86a", img: "avx", label: "Avalanche (AVX)"},
  {id:"0xfa", img: "ftm", label: "Fantom (FTM)"},
]

function App() {
  const { status, connect, account, chainId, switchChain } = useMetaMask();


  return (
    <Container>
      <Row>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>
              <i className="mdi mdi-bitcoin" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="menu" size="sm"/>
            <Navbar.Collapse id="menu">
              <Nav fill className="justify-content-end">
                {status === "connected" && <Nav.Item>{account}</Nav.Item>}
                <NavDropdown
                  title={chainMap.find(({id}) => id === chainId)?.label || "Choose chain"}
                  id="basic-nav-dropdown"
                  disabled={status !== "connected"}
                >
                  {chainMap.map(({id, img, label}) => 
                    <NavDropdown.Item key={id} onClick={() => switchChain(id)} className="dropdown-item">
                      <img src={require(`./img/${img}.svg`)} alt={label} className="dropdown-img" />
                      <span>{label}</span>
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row sm="auto" className="justify-content-md-center button-wrapper">
        <Col>
        
        {status === "notConnected" && (
          <Button size="lg" onClick={connect}>
            Connect Wallet
          </Button>
        )}
        {status === "connecting" && (
          <Button size="lg" variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            connecting...
          </Button>
        )}
        {status === "connected" && <h1>Welcome my friend!</h1>}
        {status === "unavailable" && (
          <div>
            <span>Please install </span>
            <a href="https://metamask.io/" target={"_blank"} rel="noreferrer">
              Metamask
            </a>
            <span> extension!</span>
          </div>
        )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
