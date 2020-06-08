import React from "react";
import Typed from "react-typed";
import BaseLayout from "../components/layouts/BaseLayout";
import { Row, Col, Container } from "reactstrap";

class Index extends React.Component {

	state = {
		isFlipping: false
	}

	componentDidMount = () => {
		this.animateCard();
	}

	componentWillUnmount = () => {
		this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
	}

	roles = [
		"Developer",
		"Tech Lover",
		"Team Player",
		"Course Creator",
		"React.js",
		"Angular"
	];

	animateCard = () => {
		this.cardAnimationInterval = setInterval(() => {
			this.setState({
				isFlipping: !this.state.isFlipping
			});
		}, 10000)
	}

  render() {
		const { isAuthenticated, user } = this.props.auth;
		const { isFlipping } = this.state;

    return (
      <BaseLayout className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`} {...this.props.auth} headerType="index" title="James Park - Portfolio">
        <div className="main-section">
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
										<div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img alt="Guy programming welcome picture" className="image" src="/images/section-1.png" />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Get Your Projects Done </h2>
                        <div className="hero-section-content-intro">
                          Professional and top quality service in web development.
                        </div>
                      </div>
                      <img alt="Guy programming welcome picture" className="image" src="/images/section-2.png" />
                      <div className="shadow-custom shadow-custom-2">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {isAuthenticated && <span><b>{user.name}</b></span>} 안녕하세요 Welcome to
                    the portfolio website of James Park. Get informed,
                    collaborate and discover projects I was working on through
                    the years!
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={this.roles}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                />
                <div className="hero-welcome-bio">
                  <h2>Let's take a look at my work.</h2>
                </div>
              </Col>
            </Row>
          </Container>
					<span className="service-link">Vector illustration credit:{' '}
						<a href="https://www.Vecteezy.com/">vecteezy.com</a>
					</span>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;
