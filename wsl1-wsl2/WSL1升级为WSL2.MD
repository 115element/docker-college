#1.打开对应windows功能
需要打开“系统虚拟机平台”功能，在“控制面板\所有控制面板项\程序和功能”中选择“启用或者关闭Windows功能”，勾选对应选项即可：虚拟机平台

#2.将Ubuntu-for-WSL1 升级为 WSL2
```shell
wsl.exe --set-version Ubuntu 2
```

#3.将wsl2设置为默认
```shell
wsl --set-default-version 2
```

#4.检查
检查分配给每个已安装的Linux分发版的WSL版本： wsl -l -v
也可以使用：wsl --list --verbose

