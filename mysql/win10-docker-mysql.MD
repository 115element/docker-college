>>>>>>>>>>>>>win10-Docker-安装mysql

#docker pull 镜像:版本号  (如果不指定版本号，默认拉下来是最新版latest)
```shell
docker pull mysql:8.0.13
```

#2. 运行容器 -v表示数据卷  注意：-d 容器以后台模式运行  [windows挂载数据卷： /h/volumes：表示h盘符下volumes文件夹]
```shell
docker run 
   --name mysql8 
   -p 3307:3306 
   -e MYSQL_ROOT_PASSWORD=123456 
   -v /h/volumes/mysql/data:/var/lib/mysql:rw 
   -v /h/volumes/mysql/log:/var/log/mysql:rw 
   -v /h/volumes/mysql/config/my.cnf:/etc/mysql/my.cnf:rw  
   -v /h/volumes/mysql/mysql-files:/var/lib/mysql-files/ 
   --privileged=true 
   --restart=always 
   -d 
   --lower_case_table_names=1 #忽略表名大小写
   mysql:8.0.13
```
```shell
docker run --name mysql8 -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 -v /h/volumes/mysql/data:/var/lib/mysql:rw -v /h/volumes/mysql/log:/var/log/mysql:rw -v /h/volumes/mysql/config/my.cnf:/etc/mysql/my.cnf:rw  -v /h/volumes/mysql/mysql-files:/var/lib/mysql-files/ --privileged=true --restart=always -d mysql:8.0.13
docker run --name mysql8 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -v /d/volumes/mysql/data:/var/lib/mysql:rw -v /d/volumes/mysql/log:/var/log/mysql:rw -v /d/volumes/mysql/config/my.cnf:/etc/mysql/my.cnf:rw  -v /d/volumes/mysql/mysql-files:/var/lib/mysql-files/ --privileged=true --restart=always -d mysql:8.0.13
```
>注意：-v /h/volumes/mysql/config/my.cnf:/etc/mysql/my.cnf:rw 这一句最后的my.cnf不会创建为文件，而是docker帮你创建了一个文件夹，你需要手动创建my.cnf文件在该目录
> 而且如果你的容器已经启动，那么你修改该配置，会自动映射到docker容器内指定的文件，很神奇偶


#3.进入容器
```shell
 docker exec -it 容器id /bin/bash
```

#4.进入容器中的mysql
```shell
mysql -uroot -p

--输入密码: 123456
```

#5.需要使用 mysql_native_password方式加密密码，重要一步，不然客户端连接不上。
```shell
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```

#6.使用本地Navicat连接此mysql即可

查看mysql编码
```shell
show variables like 'character%';
```


