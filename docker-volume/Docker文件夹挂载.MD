```
背景介绍
docker volume 可以使我们在启动docker容器时，动态的挂载一些文件（如配置文件）, 
以覆盖镜像中原有的文件，但是，挂载一个主机上尚不存在的文件夹或者文件到容器中会怎样呢？
LZ在工作中就遇到了这样的问题，故自己实践了一下，记录实验结果如下：
```
文件夹挂载
docker在文件夹挂载上的行为是统一的，具体表现为：
* 若文件夹不存在，则先创建出文件夹（若为多层文件夹，则递归创建）
* 用host上的文件夹内容覆盖container中的文件夹内容
```shell
docker run -v /path-to-folder/A:/path-to-folder/B test-image
```

详细说明如下：

#host上文件夹存在，且非空
```text
-----------------------------------------------------------------------------------------------
|    host	    |    container	    |        mount result                                     |
-----------------------------------------------------------------------------------------------
|存在的非空文件夹A |  不存在的文件夹B	|    先在container中创建文件夹B，再将A文件夹中的所有文件copy到B中 |
-----------------------------------------------------------------------------------------------
|存在的非空文件夹A |  存在的非空文件夹B	|    先将container中文件夹B的原有内容清空，再将A中文件copy到B中   |  
-----------------------------------------------------------------------------------------------
[总结：无论container中的文件夹B是否存在， A都会完全覆盖B的内容]
```


#host上文件夹存在，但为空
```text
----------------------------------------------------------------------
|    host	    |    container	    |        mount result            |
----------------------------------------------------------------------
| 存在的空文件夹A  |  存在的非空文件夹B	|    container中文件夹B的内容被清空  |
----------------------------------------------------------------------
[总结：container中对应的文件夹内容被清空]
```


#host上文件夹不存在
```text
------------------------------------------------------------------------------------------------
|    host	        |    container	    |        mount result                                  |
------------------------------------------------------------------------------------------------
| 不存在的文件夹A      |  存在的非空文件夹B	|    在host上创建文件夹A，container中文件夹B的内容被清空      |
------------------------------------------------------------------------------------------------
| 不存在的文件夹A/B/C  |  存在的非空文件夹B	|    在host上创建文件夹A/B/C，container中文件夹B的内容被清空  |
------------------------------------------------------------------------------------------------
[总结：container中对应的文件夹内容被清空]
```



###[文件夹挂载大总结： host上文件夹一定会覆盖container中文件夹：]
```text
-------------------------------------------------------------------------------------------------------------------------------------
|    host	                    |    container	                    |        mount result                                           |
-------------------------------------------------------------------------------------------------------------------------------------
| 文件夹不存在/文件夹存在但为空      |  文件夹不存在/存在但为空/存在且不为空	|    container中文件被覆盖（清空）                                  |
-------------------------------------------------------------------------------------------------------------------------------------
| 文件夹存在且不为空               |  文件夹不存在/存在但为空/存在且不为空	|    container中文件夹内容被覆盖（原内容清空， 覆盖为host上文件夹内容）   |
-------------------------------------------------------------------------------------------------------------------------------------
```


===================================================================================
```text
想要指定容器的配置文件和宿主机目录进行挂载中，随时更改宿主机配置文件随时生效，怎么处理呢？
1.先简单启动容器
2.进入容器中，找到具体配置文件位置
3.到容器外部，执行以下命令，将容器中的配置文件复制到宿主机你指定的目录中
4.停止并删除容器，重新运行容器，并且指定volume数据卷挂载
```
```shell
复制容器文件到宿主机:
docker cp nginx:/etc/nginx  H:\volumes\nginx

复制宿主机文件到容器中:
docker cp H:\volumes\nginx  nginx:/etc/nginx
```
		
		
		
		

