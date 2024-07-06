import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {  
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className='text-center py3'>
              <p>ProShop &copy; {currentYear}</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer
