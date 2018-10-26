import React, { Component } from 'react';
import './App.css';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import Eos from 'eosjs';
import Button from '@material-ui/core/Button'

class App extends Component {
  network =  {
    blockchain:'eos',
    protocol:'https',
    host:'mainnet.meet.one',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  };
  currentAccount = null;
  connected = false;

  async connect(){
    //change name 'hello-scatter' to your application's name
    this.connected = await ScatterJS.scatter.connect('hello-scatter')
    console.log(this.connected);
  }

  // login with eos account via scatter
  async login(){
    if (!this.connected) {
      console.log('not connected');
      return;
    }
    try {
      let result = await ScatterJS.scatter.getIdentity({accounts:[this.network]})
      this.currentAccount = result.accounts[0];
      console.log("login success,", this.currentAccount)
      alert("login success" + JSON.stringify(this.currentAccount))
    } catch (e) {
      alert("login fail")
      console.log("login fail,", e)
    }
  }

  async transfer(){
    if (this.currentAccount == null) {
      await this.handleLogin()
    }
    let eos = ScatterJS.scatter.eos(this.network, Eos);
    try{
      let result = await eos.transfer(this.currentAccount.name, 'eosfavorcomm', '0.0001 EOS', 'hello-eos-scatter, dapp demo transfer');
      console.log(result)
    } catch(e) {
      console.log("error", e)
    }
  }

  async sayHello(){
    if (this.currentAccount == null) {
      await this.handleLogin()
    }
    //please change hello_contract_name to your contract account
    let hello_contract_name = 'itleakstoken';
    let eos = ScatterJS.scatter.eos(this.network, Eos);
    try{
      let data = {
        user:this.currentAccount.name
      }
      let tr = await eos.transaction(
        {
            actions: [
                {
                    account: hello_contract_name,
                    name: 'hi',
                    authorization: [{
                      actor: this.currentAccount.name,
                      permission: this.currentAccount.authority
                    }],
                    data,
                }
            ]
        }
      )
      console.log(tr)
    } catch(e) {
      console.log("error", e)
    }
  }

  async logout() {
    ScatterJS.scatter.forgetIdentity();
  }

  async handleLogin() {
    await this.connect()
    await this.login()
  }

  render() {
    document.title="hello-eos-scatter";
    return (
      <div className="App">
      <div className="BtnDiv">
          <div className="Btn">
            <Button variant="contained" color="primary" onClick={this.handleLogin.bind(this)}>login</Button>
          </div>
          <div className="Btn">
            <Button variant="contained" color="primary" onClick={this.transfer.bind(this)}>transfer</Button>
          </div>
          <div className="Btn">
            <Button variant="contained" color="primary" onClick={this.sayHello.bind(this)}>sayHi</Button>
          </div>
      </div>
      </div>
    );
  }
}

export default App;
