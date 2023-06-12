import React, { Component } from 'react';
import { Container, Row, Col, Card , CardBody} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import TradingViewChart from '../Dashboard/TradingViewChart';


class LiveCharts extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Charts/Graphs", link : "#" },
                { title : "Forex ", link : "#" },
            ],
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Forex Charts" breadcrumbItems={this.state.breadcrumbItems} />
                    
                    <Row>
                        
                    
                    <TradingViewChart />
                        
                       

                        
                


                    </Row>

                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default LiveCharts;