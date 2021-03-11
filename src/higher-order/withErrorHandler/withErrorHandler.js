import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentDidMount(){
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })

      axios.interceptors.response.use(res => res, err => {
        console.log("error is ", err);
        this.setState({error: err})
      })
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

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