import React, {Component} from 'react'
import Auxiliary from '../../../higher-order/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    render ()  {

      const ingredientSummary = Object.keys(this.props.ingredients)
        .map(inKey => {
          return (
          <li key={inKey}>
            <span style={{textTransform: 'capitalize'}}>{inKey}</span>: {this.props.ingredients[inKey]}
          </li> );
      });

      return (
        <Auxiliary>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price: {this.props.price}</strong> {}</p>
          <p>Continue to Checkout?</p>
          <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.purchaseSubmitHandler}>SUBMIT</Button>
        </Auxiliary>
      )  
    }
};

export default OrderSummary;