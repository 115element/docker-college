#拉取最新版镜像
```shell
docker pull nginx
```

#运行容器
```shell
docker run --name nginx -d -p 80:80 nginx
```

#拷贝nginx容器内的文件目录，到宿主机win10的指定目录 
[win10 docker cp 时提示：A required privilege is not held by the client.][那么需要以管理员打开Terminal再执行就好了]
```shell
docker cp nginx:/etc/nginx H:\volumes\nginx
```

#停止并删除容器
```shell
#停止nginx容器
docker stop nginx
 
#删除nginx容器
docker rm nginx

#查看nginx容器是否删除
docker ps -a
```


#创建容器并挂载文件夹   [Docker因为禁止挂载宿主机不存在的文件，但是可以挂载宿主机不存在的文件夹，因为上面已经使用docker cp命令把容器中内容拷贝出来了，所以下面挂载数据卷可以直接映射文件]
```shell
docker run 
  -itd 
  -p 80:80 
  --name nginx 
  -v /h/volumes/nginx/html:/usr/share/nginx/html 
  -v /h/volumes/nginx/logs:/var/log/nginx
  -v /h/volumes/nginx/nginx.conf:/etc/nginx/nginx.conf 
  -v /h/volumes/nginx/conf.d:/etc/nginx/conf.d
  --restart=always 
  --privileged=true 
  nginx
```

```shell
docker run -itd -p 80:80 --name nginx -v /h/volumes/nginx/html:/usr/share/nginx/html -v /h/volumes/nginx/logs:/var/log/nginx -v /h/volumes/nginx/nginx.conf:/etc/nginx/nginx.conf -v /h/volumes/nginx/conf.d:/etc/nginx/conf.d --restart=always --privileged=true nginx
```
