# hello-eos-scatter
# 准备工作
## 安装scatter
安装chrome scatter插件，并已绑定一个账号，具体参考
https://blog.csdn.net/ITleaks/article/details/83409553

## 部署hello智能合约
使用javascript脚本js4eos,不需要eos任何环境即可编译部署智能合约，具体命令操作如下
```
//mac
npm install -g js4eos
//ubuntu
sudo npm install -g js4eos
js4eos wallet create
js4eos wallet import your_private_key
js4eos compile -o hello/hello.wasm hello/hello.cpp
js4eos compile -g hello/hello.abi hello/hello.cpp
js4eos set contract youraccount hello
js4eos push action youraccount hi '["youraccount"]' -p youraccount
```
详情请查看
https://github.com/itleaks/eos-contract/tree/master/hello-exp

# hello智能合约 scatter前端
hello-eos-scatter是基于React和Scatterjs的网页前端，能够非常方便的使用scatter连接用户，并执行
eos的智能合约。
大致代码如下
## 连接scatter
```
async connect(){
  //change name 'hello-scatter' to your application's name
  this.connected = await ScatterJS.scatter.connect('hello-scatter')
  console.log(this.connected);
}
```
## 获取账号信息
```
let result = await ScatterJS.scatter.getIdentity({accounts:[this.network]})
this.currentAccount = result.accounts[0];
console.log("login success,", this.currentAccount)
```
## 运行
```
npm install
npm -g install react-scripts
npm start
```
<img src="https://github.com/itleaks/hello-eos-scatter/blob/master/ui.jpg" width=400 height=356 />
