搜索镜像
#docker search redis

拉取镜像
#docker pull redis:5.0.9

 
#创建redis容器（指定配置文件）
```shell
docker run \
    -d \
    --name redis5 \
    -p 6379:6379 \
    -v /h/volumes/redis/redis.conf:/etc/redis/redis.conf:rw \
    -v /h/volumes/redis/data:/data:rw \
    --restart always \
    --appendonly yes \
    redis:5.0.9 
```
```shell
docker run -itd --name redis5 -p 6379:6379 -v /h/volumes/redis/redis.conf:/etc/redis/redis.conf:rw -v /h/volumes/redis/data:/data:rw --restart always redis:5.0.9 
```

> 参数说明：
-i                                     //以交互模式运行容器，通常与 -t 同时使用；
-t                                     //为容器重新分配一个伪输入终端，通常与 -i 同时使用；
-d                                     //容器以后台模式运行，以守护进程的方式启动容器
-p 6379:6379　　                        //容器redis端口6379映射宿主主机6379
--restart always                       //开机启动
--privileged=true                      //提升容器内权限
--name redis5　　                       //容器名字为redis,可以随便取
-v /usr/local/redis/conf:/etc/redis    //docker镜像redis默认无配置文件，在宿主主机/usr/local/redis/conf下创建redis.conf配置文件，会将宿主机的配置文件复制到docker中
-v /root/redis/redis01/data:/data　　   //容器/data映射到宿主机 /usr/local/redis/data下
--requirepass "123456"                 //redis密码设置
>

(-v 后面跟的不再是单独的目录了，它是[host-dir]:[container-dir]:[rw][ro] 这样的格式的、)
挂载数据卷的默认权限是读写(rw) ,我们也可以改权限
加了:ro 容器内对所挂载的数据卷内的数据就不能修改了




————————————————
数据卷的特性：

数据卷在容器启动时初始化，如果容器使用的镜像在挂载点包含了数据，这些数据会拷贝到新初始化的数据卷中
数据卷可以在容器之间共享和重用
可以对数据卷里的内容直接修改，修改回马上生效，无论是容器内操作还是本地操作
对数据卷的更新不会影响镜像的更新
数据卷会一直存在，即使挂载数据卷的容器已经被删除
————————————————


