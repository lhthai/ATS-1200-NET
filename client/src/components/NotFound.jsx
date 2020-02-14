import React from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div
      className="app flex-row align-items-center"
      style={{ marginTop: '300px' }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! Page not found.</h4>
              <p className="text-muted float-left">
                The page you are looking for was not found.
              </p>
            </div>
            <Button color="info" tag={Link} to="/">
              Back to Home
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound
