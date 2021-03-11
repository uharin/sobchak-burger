import React, {Component} from 'react';
import Auxiliary from '../../higher-order/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import instance from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../higher-order/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 3.5,
  bacon: 0.3
}
class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 2,
    purchaseable: false,
    loading: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(inKey => {
        return ingredients[inKey];
      })
      .reduce((sum, el) => {
        return sum + el;
    }, 0);
    this.setState({purchaseable: sum > 0})
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseSubmitHandler = () => {
    this.setState({ loading: true })

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Alex Koval',
        address: {
          street: '1132 N. Negley',
          zipCode: '15206',
          country: 'US'
        },
        email: 'abc@123.com'
      },
      deliveryMethod: 'fastest'
    }

    // firebase syntax requires nodename+.json
    instance.post('/orde', order)
    .then(response => this.setState({loading:false, purchasing: false}))
    .catch(error => this.setState({loading:false, purchasing: false}));

  }

  addIngredientHandler = (type) => {
    // get current count for chosen ingredient type, then add 1 to it
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    // get current price for chosen ingredient and price total for order, then add them together
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    // update state to reflect new price and updated ingredient list
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    // check to see if burger has ingredients and can be purchased
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    // get current count for chosen ingredient type, then subtract 1 from it
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) { return; }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    // get current price for chosen ingredient and price total for order, then subtract them
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    // update state to reflect new price and updated ingredient list
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    // check to see if burger has ingredients and can be purchased
    this.updatePurchaseState(updatedIngredients);
  }

	render(){
    const disabledInfo = {...this.state.ingredients};

    
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0;
    }

    let orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice.toFixed(2)}
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseSubmitHandler={this.purchaseSubmitHandler}/>;

    if(this.state.loading){
      orderSummary = <Spinner />
    }

		return (
			<Auxiliary>
        <Modal show={this.state.purchasing} dismissModal={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}/>
			</Auxiliary>
		)
	}
}

export default withErrorHandler(BurgerBuilder, instance);