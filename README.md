# install dependencies
install cnpm -g
cnpm install --registry=http://nexus.oaknt.com:18081/repository/oak_npm_group/
cnpm : 无法加载文件 D:\nodejs\node_global\cnpm.ps1    http://www.dreamwu.com/post-1101.html
删除 node_modules
npm cache clean --force
重启电脑
cnpm install --registry=http://nexus.oaknt.com:18081/repository/oak_npm_group/

# 启动
npm run dev-local
