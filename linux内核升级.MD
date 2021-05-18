本人升级的目的是想在CentOS6.X上运行docker，官方建议内核版本在3.8.0及以上，于是就自己从Linux内核官方网站上下载源码，自己编译。

#1.理解内核的定义及升级内核的意义
```
操作系统是和硬件打交道并且提供人机操作交互的支撑软件。
linux内核负责管理系统的进程、内存、设备驱动程序、文件和网络系统，决定着系统的性能和稳定性。
所以说，当有硬件新特性或者对系统稳定性有更高要求的时候，我们需要升级内核。
比如，本次我升级是因为想使用docker，docker要求centos内核版本至少3.8以上，所以我需要升级内核。
```

#2.理解内核编译及模块的概念
```
linux内核是基于c语言编写的，一般我们在官网 https://www.kernel.org下载的是内核源码，
和编译其他c语言程序一样，想要内核文件生成可执行文件，需要将内核源码进行编译。
内核模块是一些可以让操作系统内核在需要时载入和执行的代码，这同样意味着它可以在不需要时由操作系统卸载。
它们扩展了操作系 统内核的功能却不需要重新启动系统。
举例子来说，其中一种内核模块是设备驱动程序模块，它们用来让操作系统正确识别，使用安装在系统上的硬件设备。
如果没有内核模块，我们不得不一次又一次重新编译生成单内核操作系统的内核镜像来加入新的功能。
我们可以将内核模块理解为：完成某种功能的函数功能块儿，可以插拔在操作系统上。
```

#3.确认内核及版本信息
```shell
[root@hostname ~]# uname -r
2.6.32-220.el6.x86_64
[root@hostname ~]# cat /etc/centos-release
CentOS release 6.2 (Final)
```

#4.安装软件,编译安装新内核,依赖于开发环境和开发库
```shell
yum grouplist                                                         //查看已经安装的和未安装的软件包组,来判断我们是否安装了相应的开发环境和开发库
yum groupinstall "Development Tools"                                  //一般是安装这两个软件包组,这样做会确定你拥有编译时所需的一切工具
yum install ncurses-devel                                             //你必须这样才能让 make *config 这个指令正确地执行
yum install qt-devel                                                  //如果你没有 X 环境,这一条可以不用
yum install hmaccalc zlib-devel binutils-devel elfutils-libelf-devel  //创建 CentOS-6 内核时需要它们
                                                                      //如果当初安装系统是选择了Software workstation,上面的安装包几乎都已包含.
```

#5.获取（下载内核源码包）
方式1(手动去指定网址下载):  https://www.kernel.org/pub/linux/kernel/v3.x/下载
方式2(wget命令下载):      wget https://www.kernel.org/pub/linux/kernel/v3.x/linux-3.19.tar.gz 命令下载内核源码
方式3(手动下载):          去http://www.kernel.org首页,可以看到有stable,longterm等版本,longterm是比stable更稳定的版本,会长时间更新


#6.解压下载好的内核源码文件
————————————————
解压缩命令： [tar -xvf 内核源码压缩包名 -C 目的文件夹]
目的文件夹(根据不同的linux种类和版本填写符合操作系统的路径):
有可能是/usr/src/kernel/，
有可能是/usr/src，
有可能是/usr/src/redhat，
————————————————
[root@sean ~]# tar -xf linux-3.10.58.tar.gz -C /usr/src/                    //解压指定的内核源码文件到指定路径
[root@sean ~]# cd /usr/src/linux-3.10.58/                                   //切换到源码文件解压到的路径                 
[root@sean linux-3.10.58]# cp /boot/config-2.6.32-220.el6.x86_64 .config    //复制原系统的内核文件(不同系统文件名不一样),到.config


#7.我们在系统原有的内核配置文件的基础上建立新的编译选项，所以复制一份到当前目录下，命名为.config。接下来继续配置：
[root@sean linux-3.10.58]# sh -c 'yes "" | make oldconfig'
```outPut
HOSTCC scripts/basic/fixdep
... ...
XZ decompressor tester (XZ_DEC_TEST) [N/m/y/?] (NEW)
Averaging functions (AVERAGE) [Y/?] (NEW) y
CORDIC algorithm (CORDIC) [N/m/y/?] (NEW)
JEDEC DDR data (DDR) [N/y/?] (NEW)
 configuration written to .config
```
make oldconfig会读取当前目录下的.config文件，在.config文件里没有找到的选项则提示用户填写。
make oldconfig会在生成新的.config之前备份为.config.old，并生成新的.config文件


#8.开始编译
[root@sean linux-3.10.58]# make -j4 bzImage         //生成内核文件
[root@sean linux-3.10.58]# make -j4 modules         //编译模块
[root@sean linux-3.10.58]# make -j4 modules_install //编译安装模块
-j后面的数字是线程数，用于加快编译速度，一般的经验是，逻辑CPU，就填写那个数字，例如有8核，则为-j8。（modules部分耗时30多分钟）


#9.安装
[root@sean linux-3.10.58]# make install
实际运行到这一步时，出现: 
modinfo: could not find module vmware_balloon```，但是不影响内核安装，是由于vsphere需要的模块没有编译，要避免这个问题，需要在make之前时修改.config文件，加入
HYPERVISOR_GUEST=y
CONFIG_VMWARE_BALLOON=m
（这一部分比较容易出问题，参考下文异常部分）


###10.修改grub引导，重启###
安装完成后，需要修改Grub引导顺序，让新安装的内核作为默认内核。
编辑grub.conf文件; [vi /etc/grub.conf]
```text
default=0 
```
数一下刚刚新安装的内核在哪个位置，从0开始，然后设置default为那个数字，一般新安装的内核在第一个位置，所以设置default=0。
重启`reboot`：


###11.确认当内核版本###
[root@hostname ~]# uname -r
3.19.0.el6.x86_64