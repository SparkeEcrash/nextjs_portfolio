import React from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';
import PortfolioCardDetail from './PortfolioCardDetail';



export default class PortfolioCard extends React.Component {
	state = {
		isOpen: false
	}

	handleToggle = () => {

		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const { portfolio, children } = this.props;
		const { isOpen } = this.state;

		return (
			<span onClick={this.handleToggle}>
				<PortfolioCardDetail toggle={this.handleToggle} portfolio={portfolio} isOpen={isOpen}/>
				<Card className="portfolio-card">
					<CardHeader className="portfolio-card-header">{portfolio.position}</CardHeader>
					<CardBody>
						<p className="portfolio-card-city">{portfolio.location}</p>
						<CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
						<CardText className="portfolio-card-text">{portfolio.description}</CardText>
						{children}
					</CardBody>
				</Card>
			</span>
		)
	}
}