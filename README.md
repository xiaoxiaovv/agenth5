# install dependencies
#### clone项目之后先修改这里
复制一份然后去掉中文
/indexDev-去掉中文.html
/config/indexLocal-去掉中文.js

####node版本要求
如果install 有问题，则需要安装node 12.18.3（目前发现的是14版本有问题）
npm install cnpm -g
cnpm install --registry=http://nexus.oaknt.com:18081/repository/oak_npm_group/
cnpm : 无法加载文件 D:\nodejs\node_global\cnpm.ps1    http://www.dreamwu.com/post-1101.html
删除 node_modules
npm cache clean --force
重启电脑
cnpm install --registry=http://nexus.oaknt.com:18081/repository/oak_npm_group/

# 启动
npm run dev-local
