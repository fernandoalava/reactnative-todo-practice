
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import { connect } from 'react-redux'
import { toggleTodo,addTodo } from './actions'


class ToDo extends Component {

  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this);
  }


  handlePress(){
    let task_text = this._textInput._lastNativeText;
    if(task_text){
       /*
       this.setState(
        (prevState) => {
          return Object.assign({},prevState,{todos:[...prevState.todos,{text:task_text,complete:false}]});
        }
      );
      */
      this.props.onAddTodo(task_text);
      this._textInput.setNativeProps({text: ''});
    } 
  }

  handleClickTask(id){
    //this is a mutation, this is a very bad practice
    /*
    this.setState(
      (prevState) => {
        prevState.todos[index].complete = !prevState.todos[index].complete;
        return prevState;
      }
    )
    */
    //this is the right form avoid mutation
    /*
    this.setState(
      (prevState) => {
        return Object.assign({},prevState,
        {
          todos:prevState.todos.map((todo,i)=>{
            if(index==i){
              return {...todo,complete:!todo.complete}
            }
          })
        })
      }
    )*/
    this.props.onTodoClick(id)
  }

  render() {
    return (
      <View>
        <TextInput placeholder ="Add new task" ref={component => this._textInput = component}/>
        <Button title="Add" onPress={this.handlePress}/>
        {
          this.props.todos.map(task =>(
                <Text style={(task.completed)?{textDecorationLine : 'line-through'}:{textDecorationLine:'none'}} onPress={()=>this.handleClickTask(task.id)}>{task.text}</Text>
           )
          )
        }
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    },
    onAddTodo: (text) => {
      dispatch(addTodo(text))
    }
  }
}

export const TodoList = connect(mapStateToProps,mapDispatchToProps)(ToDo)
