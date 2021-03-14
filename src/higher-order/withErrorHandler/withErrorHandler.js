import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary'

/* 
  Global error handler to handle errors gracefully throughout app.
  Just use withErrorHandler(wrappedComponent) to use.
  Displays modal if http request from wrapped component returns error.
*/

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

//  ======================= STATE ===========================

    state = {
      error: null
    }


//  ===================== LIFECYCLE HOOKS ====================

    componentWillMount(){
      // on any new http request, set error state to null
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })

      // if response from server is error, set error state to error
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({error: err})
      })
    }

    componentWillUnmount(){
      // remove interceptors when wrappedComponent unmounts. Prevents memory leaks.
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }



//  ==================== COMPONENT METHODS ======================

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }



//  ======================== RENDER =========================

    render () {
      return (
        <Aux>
          <Modal 
            dismissModal={this.errorConfirmedHandler}
            show={this.state.error}> 
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
}

export default withErrorHandler;