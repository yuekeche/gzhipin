/*
使用mongoose操作mongodb的测试文件
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
 */
// const md5 = require('blueimp-md5')
/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose=require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin_test2')
// 1.3. 获取连接对象
const conn=mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected',function(){
    console.log('数据库连接成功！')
})

/*2. 得到对应特定集合的Model*/
// 2.1. 字义Schema(描述文档结构)
const userSchema=mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    type: {type: String, required: true}, // 用户类型: dashen/laoban
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel=mongoose.model('user',userSchema)   //集合的名称为users
/*3. 通过Model或其实例对集合数据进行CRUD操作*/
// 3.1. 通过Model实例的save()添加数据
function testSave(){
const user={
    username:'Tom',
    password:'123',
    type:'dashen'
}
const usermodel=new UserModel(user)
    usermodel.save(function(error,user){   //user有_id
console.log('save()',error,user)
    })
}
//testSave()
// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind(){
    //查找多个
    UserModel.find({username:'Tom'},function(error,users){   //返回包含所有匹配数据的数组，如果没有返回[]
        console.log('find()',error,users)
    })

    //查找一个
   UserModel.findOne({username:'Tom'},function(error,user){   //返回一个匹配的对象，如果没有返回null
       console.log('findOne',error,user)
   })


}
// testFind()
// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate(){
   UserModel.findByIdAndUpdate({_id: '5b2d8bd90a673f1af8739877' },{username: 'yyy'},function(err,user){
console.log('update()',err,user)
   })
}
testUpdate()
// 3.4. 通过Model的remove()删除匹配的数据
function testRemove(){
UserModel.remove({_id:'5b2d8bd90a673f1af8739877'},function(error,doc){
    console.log('remove()',error,doc)
})
}
testRemove()