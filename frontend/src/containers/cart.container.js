import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Cart from "../components/cart/cart";
import * as productActions from "../actions/product.action";
import * as homeActions from "../actions/home.action";
import * as userActions from "../actions/user.action";
import * as cartActions from '../actions/cart.action';
import storeConfig from "../config/storage.config"

// snowplow tracking
import { trackSelfDescribingEvent } from '@snowplow/browser-tracker';

class CartContainer extends Component {
	constructor() {
		super();
	}
	componentWillMount() {
		this.props.actions.auth()
		this.props.cartActions.getCart()
	}

	async trackingPurchase(address, phone, name, total) {
		let cart = this.props.cart
		cart.map(async (element, index) => {
			// var category = await this.props.productActions.getNameCategoryByID(element.id_category)
			// var publisher = await this.props.productActions.getNamePubliserByID(element.id_nsx)
			// var author = await this.props.productActions.getNameAuthorByID(element.id_author)

			// trackSelfDescribingEvent({
			// 	event: {
			// 		schema: 'iglu:com.bookshop/product_action/jsonschema/1-0-0',
			// 		data: {
			// 			action: "purchase"
			// 		}
			// 	},
			// 	context: [{
			// 		schema: "iglu:com.bookshop/product_context/jsonschema/1-0-0",
			// 		data: {
			// 			product_id: element._id,
			// 			product_name: element.name,
			// 			quantity: parseInt(element.count),
			// 			price: element.price,
			// 			category: category.data.name,
			// 			publisher: publisher.data.name,
			// 			author: author.data.name
			// 		}
			// 	}]
			// })
		})

		let bill = await this.props.cartActions.payment(address, phone, name, total)
		console.log("bill", bill)
	}

	async trackingDeleteProduct(product) {
		console.log("cart container", product)
		// var category = await this.props.productActions.getNameCategoryByID(product.id_category)
		// var publisher = await this.props.productActions.getNamePubliserByID(product.id_nsx)
		// var author = await this.props.productActions.getNameAuthorByID(product.id_author)

		// trackSelfDescribingEvent({
		// 	event: {
		// 		schema: 'iglu:com.bookshop/product_action/jsonschema/1-0-0',
		// 		data: {
		// 			action: "remove"
		// 		}
		// 	},
		// 	context: [{
		// 		schema: "iglu:com.bookshop/product_context/jsonschema/1-0-0",
		// 		data: {
		// 			product_id: product._id,
		// 			product_name: product.name,
		// 			quantity: parseInt(product.count),
		// 			price: product.price,
		// 			category: category.data.name,
		// 			publisher: publisher.data.name,
		// 			author: author.data.name
		// 		}
		// 	}]
		// })

		this.props.cartActions.deteleProductInCart(product)
	}

	render() {
		return (
			<Cart
				islogin={this.props.islogin}
				logout={() => this.props.actions.logout()}

				searchTextSubmit={() => this.props.homeActions.searchTextSubmit()}
				setSearchText={value => this.props.homeActions.setSearchText(value)}
				history={this.props.history}
				cart={this.props.cart}
				updateProductInCart={(product,quantity) => this.props.cartActions.updateProductInCart(product, quantity)}
				deteleProductInCart={(product) => this.trackingDeleteProduct(product)}

				payment={(address, phone, name, total) => this.trackingPurchase(address, phone, name, total)}
				ispay={this.props.ispay}
			/>
		);
	}
}
const mapStateToProps = state => ({
	islogin: state.userReducers.login.islogin,
	cart: state.cartReducers.cart.data,
	ispay: state.cartReducers.cart.ispay
});

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(userActions, dispatch),
		homeActions: bindActionCreators(homeActions, dispatch),
		productActions: bindActionCreators(productActions, dispatch),
		cartActions: bindActionCreators(cartActions, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
