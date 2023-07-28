import React, { Component } from 'react';
import axios from 'axios';

  class App extends Component {
   
    constructor() {
      super();
      this.criateColaborador = this.criateColaborador.bind(this);
      this.escreverEstado = this.escreverEstado.bind(this);
      this.update = this.update.bind(this);
      //this.delete = this.delete.bind(this);
      this.url = "http://127.0.0.1/PHP_Professional/Crud-React-PHP/app";
      this.state = {
          
          colaborador:[],
          id:'',
          nome:'',
          username:'',
          saldo:'',
          envio:true
      };
    }

    componentDidMount() {
      this.getColaboradores();
    }

    async getColaboradores() {
      try {
        const res = await axios.get(this.url+'/list.php');
        this.setState({
          colaborador:res.data
        })  
      }
      catch (error) {
        console.error(error);
      }
    }

    async criateColaborador(e) {
      e.preventDefault();

      try {
        if(this.state.envio){
          const {nome, username, saldo} = this.state;
          const obj1 = {nome:nome, username:username, saldo:saldo };
          await axios.post(this.url+'/create.php',obj1);
        }
        else{
          const {id, nome, username, saldo} = this.state;
          const obj2 = {id:id, nome:nome, username:username, saldo:saldo };
          await axios.post(this.url+'/update.php',obj2);
        }
      } 
      catch (error) {
        console.error(error);
      }
      this.setState({
       id:'',
       nome:'',
       username:'',
       saldo:'',
       envio:true,
      })
      this.getColaboradores();
    }

    escreverEstado(e) {
      const {name , value} = e.target;
      this.setState({
        [name]:value
      });
    }

    async delete(e,id) {
      e.preventDefault();
      const obj = {id:id}; 
      
      try {
        if(window.confirm("esta seguro de querer elinarlo")){
          await axios.post(this.url+'/delete.php',obj); 
          this.getColaboradores();
        }
      } 
      catch (error) {
        console.error(error);
      }
    }
    
    async update(e, id){
      e.preventDefault();
      const obj = {id:id}; 
      try {
        const res = await axios.post(this.url+'/read.php',obj);
        this.setState({
          id:res.data[0].id,
          nome:res.data[0].nome,
          username:res.data[0].username,
          saldo:res.data[0].saldo,
          envio:false
        });    
        console.log(res);
          this.getColaboradores();
      } 
      catch (error) {
        console.error(error);
      }
    }
   
    render(){
      return(

        <div className="container p-4">
          <nav className="navbar navbar-dark bg-dark mb-2">
        <span className="navbar-brand mb-0 h1">CRUD-REACT-PHP-MYSQL</span>
          </nav>
          <form onSubmit={this.criateColaborador}>
            <input type="text"  name="nome"   onChange={this.escreverEstado} 
            value={this.state.nome} placeholder="nome"/>

              <input type="text" name="username"  onChange={this.escreverEstado} 
              value={this.state.username} placeholder="username"/>

              <input type="number"  name="saldo" onChange={this.escreverEstado}
              value={this.state.saldo} placeholder="saldo"/>
            <input type="submit" className="btn btn-success" value="Submit" />
          </form>   
          <div className="row p-3">

                {
                this.state.colaborador.map(item=>{
                  return (

                    <div className="card p-2 m-2" key={item.id}>
                      <img  width="60" src="logo192.png" alt="img"></img>
                      <div className="card-body">
                        <h6>{item.nome}</h6>
                        <h6>{item.username}</h6>
                        <h6>{item.saldo}</h6>
                    <button className="btb btn-danger mx-2"
                    onClick={(e)=>this.delete(e,item.id)}>delete</button>
                    <button className="btb btn-info"
                    onClick={(e)=>this.update(e,item.id)}>edit</button>
                    </div>

                    </div>
                  )
                })
                }

                  </div>
              </div>
          );
      }
    };
export default App;