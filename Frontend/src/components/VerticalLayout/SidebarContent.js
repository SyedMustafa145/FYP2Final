import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

import { connect } from "react-redux";
import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    changePreloader
} from "../../store/actions";

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {

            if (this.props.type !== prevProps.type) {
                this.initMenu();
            }

        }
    }

    initMenu() {
        new MetisMenu("#side-menu");

        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div id="sidebar-menu">

                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">{this.props.t('Menu')}</li>

                        <li>
                            <Link to="/dashboard" className="waves-effect">
                                <i className="ri-dashboard-line"></i>
                                <span className="ms-1">{this.props.t('Dashboard')}</span>
                            </Link>
                        </li>


                        <li>
                            <Link to="/livegraphs" className="waves-effect">
                                <i className="dripicons-graph-line"></i>
                                <span className="ms-1">{this.props.t('Live Charts')}</span>
                            </Link>
                        </li>


                        <li>
                            <Link to="/news" className=" waves-effect">
                                <i className="ri-newspaper-line"></i><span className="badge rounded-pill bg-success float-end">5</span>
                                <span className="ms-1">{this.props.t('Forex News')}</span>
                            </Link>
                        </li>


                        <li>
                            <Link to="/currenciesnews" className=" waves-effect">
                                <i className="ri-newspaper-line"></i><span className="badge rounded-pill bg-success float-end">5</span>
                                <span className="ms-1">{this.props.t('Currencies News')}</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/currenciestweets" className=" waves-effect">
                                <i className="ri-newspaper-line"></i><span className="badge rounded-pill bg-success float-end">5</span>
                                <span className="ms-1">{this.props.t('Currencies Tweets')}</span>
                            </Link>
                        </li>
             

                        <li>
                            <Link to="/prediction" className=" waves-effect">
                                <i className="dripicons-graph-line"></i><span className="badge rounded-pill bg-success float-end">5</span>
                                <span className="ms-1">{this.props.t('Prediction')}</span>
                            </Link>
                        </li>

                         <li>
                            <Link to="/manualtrade" className=" waves-effect">
                                <i className="ri-shopping-cart-line"></i>
                                <span className="ms-1">{this.props.t('Manual Trading')}</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/automatedtrade" className=" waves-effect">
                                <i className="dripicons-graph-line"></i><span className="badge rounded-pill bg-success float-end">5</span>
                                <span className="ms-1">{this.props.t('Automated Trading')}</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/makeTrade/:CurrencyPair" className=" waves-effect">
                                <i className="dripicons-graph-line"></i><span className="badge rounded-pill bg-success float-end">5</span>
                                <span className="ms-1">{this.props.t('Automated Trading 2')}</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/tradinghistory" className=" waves-effect">
                                <i className="ri-history-line"></i><span className="badge rounded-pill bg-success float-end">5</span>
                                <span className="ms-1">{this.props.t('Trading History')}</span>
                            </Link>
                        </li>


                        <li>
                            <Link to="/mywallet" className=" waves-effect">
                                <i className="ri-wallet-3-fill"></i>
                                <span className="ms-1">{this.props.t('Wallet')}</span>
                            </Link>
                        </li>



                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-store-2-line"></i>
                                <span className="ms-1">{this.props.t('Ecommerce')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/ecommerce-products">{this.props.t('Products')}</Link></li>
                                <li><Link to="/ecommerce-product-detail/1">{this.props.t('Product Detail')}</Link></li>
                                <li><Link to="/ecommerce-orders">{this.props.t('Orders')}</Link></li>
                                <li><Link to="/ecommerce-customers">{this.props.t('Customers')}</Link></li>
                                <li><Link to="/ecommerce-cart">{this.props.t('Cart')}</Link></li>
                                <li><Link to="/ecommerce-checkout">{this.props.t('Checkout')}</Link></li>
                                <li><Link to="/ecommerce-shops">{this.props.t('Shops')}</Link></li>
                                <li><Link to="/ecommerce-add-product">{this.props.t('Add Product')}</Link></li>
                            </ul>
                        </li> 

               


                        <li className="menu-title">{this.props.t('Pages')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-account-circle-line"></i>
                                <span className="ms-1">{this.props.t('Authentication')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/login">{this.props.t('Login')}</Link></li>
                                <li><Link to="/register">{this.props.t('Register')}</Link></li>
                                <li><Link to="/forgot-password">{this.props.t('Recover Password')}</Link></li>
                                <li><Link to="/lock-screen">{this.props.t('Lock Screen')}</Link></li>
                            </ul>
                        </li>  

                         <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-profile-line"></i>
                                <span className="ms-1">{this.props.t('Utility')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/starter">{this.props.t('Starter Page')}</Link></li>
                                <li><Link to="/maintenance">{this.props.t('Maintenance')}</Link></li>
                                <li><Link to="/comingsoon">{this.props.t('Coming Soon')}</Link></li>
                                <li><Link to="/timeline">{this.props.t('Timeline')}</Link></li>
                                <li><Link to="/faqs">{this.props.t('FAQs')}</Link></li>
                                <li><Link to="/pricing">{this.props.t('Pricing')}</Link></li>
                                <li><Link to="/404">{this.props.t('Error 404')}</Link></li>
                                <li><Link to="/500">{this.props.t('Error 500')}</Link></li>
                            </ul>
                        </li> 

                         <li className="menu-title">{this.props.t('Components')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-pencil-ruler-2-line"></i>
                                <span className="ms-1">{this.props.t('UI Elements')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/ui-alerts">{this.props.t('Alerts')}</Link></li>
                                <li><Link to="/ui-buttons">{this.props.t('Buttons')}</Link></li>
                                <li><Link to="/ui-cards">{this.props.t('Cards')}</Link></li>
                                <li><Link to="/ui-carousel">{this.props.t('Carousel')}</Link></li>
                                <li><Link to="/ui-dropdowns">{this.props.t('Dropdowns')}</Link></li>
                                <li><Link to="/ui-grid">{this.props.t('Grid')}</Link></li>
                                <li><Link to="/ui-images">{this.props.t('Images')}</Link></li>
                                <li><Link to="/ui-lightbox">{this.props.t('Lightbox')}</Link></li>
                                <li><Link to="/ui-modals">{this.props.t('Modals')}</Link></li>
                                <li><Link to="/ui-rangeslider">{this.props.t('Range Slider')}</Link></li>
                                <li><Link to="/ui-roundslider">{this.props.t('Round Slider')}</Link></li>
                                <li><Link to="/ui-session-timeout">{this.props.t('Session Timeout')}</Link></li>
                                <li><Link to="/ui-progressbars">{this.props.t('Progress Bars')}</Link></li>
                                <li><Link to="/ui-sweet-alert">{this.props.t('Sweet Alerts')}</Link></li>
                                <li><Link to="/ui-tabs-accordions">{this.props.t('Tabs & Accordions')}</Link></li>
                                <li><Link to="/ui-typography">{this.props.t('Typography')}</Link></li>
                                <li><Link to="/ui-video">{this.props.t('Video')}</Link></li>
                                <li><Link to="/ui-general">{this.props.t('General')}</Link></li>
                                <li><Link to="/ui-rating">{this.props.t('Rating')}</Link></li>
                                <li><Link to="/ui-notifications">{this.props.t('Notifications')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="waves-effect">
                                <i className="ri-eraser-fill"></i>
                                <span className="badge rounded-pill bg-danger float-end">6</span>
                                <span className="ms-1">{this.props.t('Forms')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/form-elements">{this.props.t('Form Elements')}</Link></li>
                                <li><Link to="/form-validation">{this.props.t('Form Validation')}</Link></li>
                                <li><Link to="/form-advanced">{this.props.t('Form Advanced Plugins')}</Link></li>
                                <li><Link to="/form-editors">{this.props.t('Form Editors')}</Link></li>
                                <li><Link to="/form-file-upload">{this.props.t('Form File Upload')}</Link></li>
                                <li><Link to="/form-xeditable">{this.props.t('Form X-editable')}</Link></li>
                                <li><Link to="/form-wizard">{this.props.t('Form Wizard')}</Link></li>
                                <li><Link to="/form-mask">{this.props.t('Form Mask')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-table-2"></i>
                                <span className="ms-1">{this.props.t('Tables')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/basic-tables">{this.props.t('Basic Tables')}</Link></li>
                                <li><Link to="/datatable-table">{this.props.t('Data Tables')}</Link></li>
                                <li><Link to="/responsive-table">{this.props.t('Responsive Table')}</Link></li>
                                <li><Link to="/editable-table">{this.props.t('Editable Table')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-bar-chart-line"></i>
                                <span className="ms-1">{this.props.t('Charts')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/apex-charts">{this.props.t("Apex Charts")}</Link></li>
                                <li><Link to="/chartjs">{this.props.t('Chartjs')}</Link></li>
                                <li><Link to="/charts-knob">{this.props.t('Jquery Knob')}</Link></li>
                                <li><Link to="/charts-sparkline">{this.props.t('Sparkline')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-brush-line"></i>
                                <span className="ms-1">{this.props.t('Icons')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/icons-remix">{this.props.t('Remix Icons')}</Link></li>
                                <li><Link to="/material-design">{this.props.t('Material Design')}</Link></li>
                                <li><Link to="/dripicons">{this.props.t('Dripicons')}</Link></li>
                                <li><Link to="/font-awesome-5">{this.props.t('Font awesome 5')}</Link></li>
                            </ul>
                        </li>


             

                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return { ...state.Layout };
};

export default withRouter(connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader
})(withNamespaces()(SidebarContent)));
