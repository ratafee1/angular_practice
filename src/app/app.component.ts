import { Component } from '@angular/core';

const todos = [
  {
  id:1,
  title:'吃饭',
  done:true
},
{
  id:2,
  title:'睡觉',
  done:false
},
{
  id:3,
  title:'打豆豆',
  done:false
}  
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todomvc-angular';
  public todos:{
    id: number,
    title: string,
    done:boolean
  }[]=todos
  public currentEditing:{
    id: number,
    title: string,
    done:boolean
  }= null
  
  public visibility:string ='all'
  addTodo(e):void{
    const text = e.target.value
    const last = this.todos[this.todos.length -1]
    if (text.length <= 0 ) {
      return
    } else {
      this.todos.push({
        id: last ? last.id+1: 1,
        title:text,
        done:true
      })
    }
    e.target.value = ''

    console.log(this.todos)
  }
  get toggleAll():boolean{
    return this.todos.every(t => t.done)
  }
  set toggleAll(val){
    this.todos.forEach(t => t.done =val)
  }
  removeTodo(index:number){
    this.todos.splice(index,1)
  }
  getEditing(){
    console.log('currentEditing')
  }
  saveEdit(todo, e){
    todo.title=e.target.value
    this.currentEditing = null
  }
  handleEditKeyUp(e){
    const {keyCode ,target} = e
    console.log(keyCode)
    if (keyCode === 27) {
      target.value = this.currentEditing.title
      this.currentEditing = null
      
    } 
  }
  get remaningCount(){
    return this.todos.filter(t => !t.done).length
  }
  clearAllDone(){
    this.todos = this.todos.filter(t => !t.done)
  }
  // 实现导航切换数据过滤的功能
  // 提供一个属性，该属性会根据当前点击的链接返回过滤之后的数据filterTodos
  // 提供一个属性，用来存储当前点击的链接标识 visibility字符串，all,active,complited
  get filterTodos(){
    if (this.visibility == 'all') {
      return this.todos
    } else if(this.visibility=='active') {
      return this.todos.filter(t=>!t.done)
    }else if(this.visibility == 'complited'){
      return this.todos.filter(t =>t.done)
    }
  }
}

window.onhashchange=function(){
  console.log('锚点改变了')
}