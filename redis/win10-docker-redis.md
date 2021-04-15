#1.搜索镜像
```shell
docker search redis
```


#2.拉取镜像
```shell
docker pull redis:5.0.9
```


#3.创建redis容器
```shell
docker run \
    -d \
    --name redis5 \
    -p 6379:6379 \
    -v /h/volumes/redis/redis.conf:/etc/redis/redis.conf:rw \
    -v /h/volumes/redis/data:/data:rw \
    --restart always \
    --privileged=true \
    redis:5.0.9 
```
```shell
docker run -itd --name redis5 -p 6379:6379 -v /h/volumes/redis/redis.conf:/etc/redis/redis.conf:rw -v /h/volumes/redis/data:/data:rw --restart always --privileged=true redis:5.0.9
docker run -itd --name redis5 -p 6379:6379 -v /d/volumes/redis/redis.conf:/etc/redis/redis.conf:rw -v /d/volumes/redis/data:/data:rw --restart always --privileged=true redis:5.0.9
```


#4.参数说明
> 参数说明：
-i                                     //以交互模式运行容器，通常与 -t 同时使用；
-t                                     //为容器重新分配一个伪输入终端，通常与 -i 同时使用；
-d                                     //容器以后台模式运行，以守护进程的方式启动容器
--name redis5　　                       //容器名字为redis,可以随便取
-v /usr/local/redis/conf:/etc/redis    //docker镜像redis默认无配置文件，在宿主主机/usr/local/redis/conf下创建redis.conf配置文件，会将宿主机的配置文件复制到docker中
-v /root/redis/redis01/data:/data　　   //(宿主机文件):(容器文件)
-p 6379:6379　　                        //容器redis端口6379映射宿主主机6379
--restart always                       //创建容器时没有添加参数  --restart=always ，导致的后果是：当Docker重启时，容器未能自动启动。
--privileged=true                      //提升容器内权限
--requirepass "123456"                 //redis密码设置
>


注意：
这里有一个特殊的玩法，假如docker1和docker2都映射了主机上同一个文件到自己的目录，在docker1里面改了文件，
docker2内也是同时改变的，就算你在主机上改了文件导致主机和docker1，docker2不再同步了，这个操作还是可以。

数据卷挂载:
( -v [host-dir]:[container-dir]:[rw][ro] )

```
先引用官方文档原话：If neither ‘rw’ or ‘ro’ is specified then the volume is mounted in
read-write mode.（https://docs.docker.com/engine/reference/run/#volume-shared-filesystems）
官方文档说不指定的时候默认是rw模式。
用docker inspect查看容器的属性，可以看到关于挂载目录的详细参数，格式如下：
“Mounts”:
{
    “Type”: ,
    “Source”: ,
    “Destination”: ,
    “Mode”: ,
    “RW”: ,
    “Propagation”:
}
1. 默认情况不使用:rw :ro选项，Mode的值就是空字符串”“。
2. 使用:rw选项，Mode的值就是”rw”。
3. 使用:ro选项，Mode的值就是”ro”。
   我们知道docker -v不仅可以挂载映射目录，也可以只挂载映射一个文件。
1. 如果我们按照1，2设置来挂载目录，宿主主机和docker互相都可以读写同步，如果我们按照1，2设置来挂载文件，这个时候只有docker的写可以同步到宿主主机上面去，宿主主机写不同步到docker。而且一旦宿主主机上写了修改了映射文件，那么docker里面再怎么写都不再同步到宿主主机了。
   注意：这里有一个特殊的玩法，假如docker1和docker2都映射了主机上同一个文件到自己的目录，在docker1里面改了文件，docker2内也是同时改变的，就算你在主机上改了文件导致主机和docker1，docker2不再同步了，这个操作还是可以。
2. 如果我们按照3来挂载目录或者挂载文件，这个时候docker内也不能写，宿主主机写了也不同步进去了，相当于创建的时候拷贝一份不可改变的配置进来而已。
   官方文档中有这样一段话：
   Note: Many tools used to edit files including vi and sed –in-place may result in an inode change. Since Docker v1.1.0, this will produce an error such as “sed: cannot rename ./sedKdJ9Dy: Device or resource busy”. In the case where you want to edit the mounted file, it is often easiest to instead mount the parent directory.
   确实，我们在docker内部运行程序使用shell的sed修改映射文件内容的时候会报错Device or resource busy，我的做法是每次cp一个临时文件出来，然后修改这个临时文件，最后cp -f 强制替换这个映射文件，官方建议我们最好还是用映射目录的方式来互相同步修改。
```


————————————————
[其中host-dir是一个绝对路径的地址，如果host-dir不存在，则docker会创建一个新的数据卷，如果host-dir存在，但是指向的是一个不存在的目录，则docker也会创建该目录，然后使用该目录做数据源。]
数据卷的特性：
- 数据卷在容器启动时初始化，如果容器使用的镜像在挂载点包含了数据，这些数据会拷贝到新初始化的数据卷中
- 数据卷可以在容器之间共享和重用
- 可以对数据卷里的内容直接修改，修改回马上生效，无论是容器内操作还是本地操作
- 对数据卷的更新不会影响镜像的更新
- 数据卷会一直存在，即使挂载数据卷的容器已经被删除
  ————————————————


