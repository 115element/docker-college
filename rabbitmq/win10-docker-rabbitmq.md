#1.拉取带管理界面的rabbitmq版本镜像
```shell
docker pull rabbitmq:3.7.7-management
```

#2.运行镜像，并映射挂载到宿主机指定文件夹
```shell
docker run 
  -d 
  --name rabbitmq3.7.7 
  -p 5672:5672 
  -p 15672:15672 
  -e RABBITMQ_DEFAULT_VHOST=my_vhost  
  -e RABBITMQ_DEFAULT_USER=admin 
  -e RABBITMQ_DEFAULT_PASS=admin 
  -e TZ=Asia/Shanghai
  --hostname myRabbit 
  -v /h/volumes/rabbitmq/data:/var/lib/rabbitmq 
  --restart=always 
  --privileged=true 
  rabbitmq:3.7.7-management
```
```shell
docker run -d --name rabbitmq3.7.7 -p 5672:5672 -p 15672:15672 -v /h/volumes/rabbitmq/data:/var/lib/rabbitmq --hostname myRabbit -e RABBITMQ_DEFAULT_VHOST=my_vhost  -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -e TZ=Asia/Shanghai --restart=always --privileged=true  rabbitmq:3.7.7-management
```

#安装之后浏览器访问http://localhost:15672
1.添加用户guest
2.点开Virtual Hosts管理,删除默认已有的虚拟机my_vhost，然后添加name为 / 的虚拟机   

#3.参数说明
```text
说明：
-d              后台运行容器；
--name          指定容器名；
-p              指定服务运行的端口（5672：应用访问端口；15672：控制台Web端口号）；
-v              映射目录或文件；
--hostname      主机名（RabbitMQ的一个重要注意事项是它根据所谓的 “节点名称” 存储数据，默认为主机名）；
-e              指定环境变量；（RABBITMQ_DEFAULT_VHOST：默认虚拟机名；RABBITMQ_DEFAULT_USER：默认的用户名；RABBITMQ_DEFAULT_PASS：默认用户名的密码）
末尾指定要运行的镜像
```
