查询mongo镜像
```shell
docker search mongo
```

拉取镜像
```shell
docker pull mongo:latest
```

运行容器
"./data/configdb:/data/configdb"
```shell
docker run --name mongodb -p 27017:27017 -v /d/volumes/mongo/data/configdb:/data/configdb -v /d/volumes/mongo/data:/data/db --restart=always --privileged=true -d mongo:latest --auth 
```



#为MongoDB添加管理员用户
1.以管理员身份进入MongoDB
```shell
docker exec -it 镜像id mongo admin
```
2.创建一个 admin 管理员账号：
```shell
use admin
db.createUser({ user: 'root', pwd: 'root', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
```
3.退出
```shell
exit
```

4.以上操作记录：
```text
docker exec -it 51a5b5e05fe4 mongo admin
MongoDB shell version v4.0.10
connecting to: mongodb://127.0.0.1:27017/admin?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("04ebc64f-df58-4931-8a68-4824ed032dd4") }
MongoDB server version: 4.0.10
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user

> db.createUser({ user: 'root', pwd: 'root', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
Successfully added user: {
	"user" : "root",
	"roles" : [
		{
			"role" : "userAdminAnyDatabase",
			"db" : "admin"
		}
	]
}
> exit
bye
```


#创建普通用户、密码和数据库
1.以 admin 用户身份进入mongo
```shell
docker exec -it 51a5b5e05fe4 mongo admin
```

2.对admin进行身份认证： PS:就是上一步创建的管理员账号密码
```shell
db.auth("root","root");
```

3.创建 用户、密码和数据库：
```shell
db.createUser({ user: 'alex', pwd: '123456', roles: [ { role: "readWrite", db: "app" } ] });
```

4.退出
```shell
exit
```

5.以上操作记录：
```text
[root@localhost ~]# docker exec -it 51a5b5e05fe4 mongo admin
MongoDB shell version v4.0.10
connecting to: mongodb://127.0.0.1:27017/admin?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("eccdd06a-f2e0-40f8-924d-173a3cbb7198") }
MongoDB server version: 4.0.10

> db.auth("root","root");
1
> db.createUser({ user: 'alex', pwd: '123456', roles: [ { role: "readWrite", db: "app" } ] });
Successfully added user: {
	"user" : "swen",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "app"
		}
	]
}
> exit
bye
```

#登录 APP 数据库

1.以admin用户身份进入mongo ：
```shell
docker exec -it 51a5b5e05fe4  mongo admin
```

2.对用户alex,进行身份认证：
```shell
db.auth("alex","123456");
```

3.切换数据库
```shell
use app
```

4.添加数据
```shell
db.test.save({name:"zhangsan"});
```

5.以上操作记录
```text
[root@localhost ~]# docker exec -it 51a5b5e05fe4 mongo admin
MongoDB shell version v4.0.10
connecting to: mongodb://127.0.0.1:27017/admin?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("48474e4e-b226-401c-ab00-62b1bae80def") }
MongoDB server version: 4.0.10
> db.auth("alex","123456");
1
> use app
switched to db app
> db.test.save({name:"zhangsan"});
WriteResult({ "nInserted" : 1 })
> exit
bye
```



