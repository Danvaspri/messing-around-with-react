import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
     Label,  Row, Col  } from 'reactstrap';
    import { Control, LocalForm, Errors } from 'react-redux-form';
    import { Link } from 'react-router-dom';

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component {
        constructor(props) {
            super(props);
    
            this.state = {
                inModalOpen:false
              };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          
            
        }
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
              });
        }
          
        handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
            // event.preventDefault();
        }

        render(){
     
            return(
                <div className="container">
                     <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                     </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="rating" md={2}>Rating</Label>
                    <Col md={10}>
                        <Control.select model=".rating" id="rating" name="rating" 
                            placeholder="Rating" 
                            className="form-control"
                            validators={{
                                required
                            }}>
                             
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          
                        </Control.select>
                              
                        <Errors
                            className="text-danger"
                            model=".rating"
                            show="touched"
                            messages={{
                                required: 'Required. '
                    
                            }}
                         />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="commentAuthor" md={2}>Your Name</Label>
                    <Col md={10}>
                        <Control.text model=".commentAuthor" id="commentAuthor" name="commentAuthor"
                            placeholder="Put Your Name Here"
                            className="form-control"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                             />
                        <Errors
                            className="text-danger"
                            model=".commentAuthor"
                            show="touched"
                            messages={{
                                required: 'Required. ',
                                minLength: 'Must be greater than 2 characters. ',
                                maxLength: 'Must be 15 characters or less. '
                            }}
                         />
                    </Col>
                </Row>
              
                         
                <Row className="form-group">
                    <Label htmlFor="comment" md={2}>Comment</Label>
                    <Col md={10}>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="6"
                            className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={{size:10, offset: 2}}>
                        <Button type="submit" color="primary">
                        Submit
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
            
            </ModalBody>
                </Modal>
            </div>
             )
        }
    }
            
        
              

    function RenderDish({dish}) {
    
        if (dish != null) {
            return (
                <div >
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
    function RenderComments({comments}) {

       
      
        if (comments == null) {
            return (<div></div>)
        }
        else{
    
        return (
            <div >
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {     comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })}
                </ul>

            </div>
        )
    }}
    

    const  DishDetail = (props) => {


      if (props.dish == null) {
            return (<div></div>)
        }
        
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <CommentForm/>
                    
                </div>
            </div>
            </div>
        );
    }

      
    

export default DishDetail;
        
