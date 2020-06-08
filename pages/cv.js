import React, { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from "reactstrap";

export class Cv extends Component {
	render() {
		return (
			<BaseLayout {...this.props.auth} title="James Park - My Cover Letter">
				<BasePage title="Preview of my CV" className="cv-page">
					<Row>
						<Col md={{size: 8, offset: 2}}>
							<div className="cv-title">
								<a download="james_cv.pdf" className="btn btn-success" href="/sample.pdf">
									Download
								</a>
							</div>
							<iframe style={{width: '100%', height: '500px'}} src="/sample.pdf">
							</iframe>
						</Col>
					</Row>
					<h1>I am Cover Page</h1>
				</BasePage>
			</BaseLayout>
		)
	}
}

export default Cv
