import React, {Component} from 'react';
import Auxiliary from '../../higher-order/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    purchaseable: false
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
    alert('Thanks for submitting!');
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

		return (
			<Auxiliary>
        <Modal show={this.state.purchasing} dismissModal={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice.toFixed(2)}
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseSubmitHandler={this.purchaseSubmitHandler}/>
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

export default BurgerBuilder;