import React, {Component} from 'react';
import Auxiliary from '../../higher-order/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      bacon: 3,
      salad: 1,
      cheese: 1,
      meat: 1
    }
  }

	render(){
		return (
			<Auxiliary>
				<Burger ingredients={this.state.ingredients}/>
        <BuildControls/>
			</Auxiliary>
		)
	}
}

export default BurgerBuilder;