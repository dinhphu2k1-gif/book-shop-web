import React, { Component } from 'react'
import * as productActions from "../../actions/product.action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import history from '../../history';
import { withRouter } from "react-router-dom";

// snowplow tracking
import { trackSelfDescribingEvent } from '@snowplow/browser-tracker';

class ProductItem extends Component {
    constructor(props) {
        super(props)
        // this.history = useHistory();
    }

    async trackingViewProduct() {
        // e.preventDefault();
        // e.stopPropagation()
        // e.stopImmediatePropagation()
        let book = this.props.book

        // comment cho m sua id
        // var category = await this.props.productActions.getNameCategoryByID(book.id_category)
        var category = this.props.book.categories[0]
		// var publisher = await this.props.productActions.getNamePubliserByID(book.id_nsx)
        var publisher = this.props.book.publisher
		// var author = await this.props.productActions.getNameAuthorByID(book.id_author)
        var author = this.props.book.authors[0]
        console.log("category", category)

        trackSelfDescribingEvent({
            event: {
                schema: 'iglu:com.bookshop/product_action/jsonschema/1-0-0',
                data: {
                    action: "view"
                }
            },
            context : [{
                schema: "iglu:com.bookshop/product_context/jsonschema/1-0-0",
                data: {
                    product_id: book.id, // comment cho m sua id
                    product_name: book.name,
                    quantity: 0,
                    price: book.price,
					category: category.name,
					publisher: publisher.name,
					author: author.name
                }
            }
            ]
        })

        console.log("send event")
        history.push('/product/' + this.props.id);
    }

    render() {
        console.log("props", this.props)
        return (
            <div className="col-sm-4">
                <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center"
                        >
                            <div style={{cursor: "pointer"}} onClick={() => this.trackingViewProduct()}><img src={this.props.urlImg} alt="" /></div>
                            <div style={{cursor: "pointer"}} onClick={() => this.trackingViewProduct()}><h4 className='name-product'>{this.props.name}</h4></div>
                            <div className='product-content'>
                                <h2>Giá:</h2>
                                <div style={{cursor: "pointer"}} onClick={() => this.trackingViewProduct()}><h2>{new Intl.NumberFormat('de-DE', { currency: 'EUR' }).format(this.props.price)}<sup>đ</sup></h2></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
	islogin: state.userReducers.login.islogin,
});

const mapDispatchToProps = dispatch => {
	return {
		productActions: bindActionCreators(productActions, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);