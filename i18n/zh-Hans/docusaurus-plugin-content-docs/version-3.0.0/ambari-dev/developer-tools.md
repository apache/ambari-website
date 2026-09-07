---
title: 开发者工具
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 开发者工具 {#developer-tools}

## Diff 和合并工具 {#diff-and-merge-tools}

Araxis 很友好地为开源工作者提供 Araxis Merge 免费许可证，只需在 http://www.araxis.com/buy/open-source 提交申请即可。

从 http://www.araxis.com/url/merge/download.uri 下载。

首次运行应用程序时，系统会要求输入序列号。要在已有安装中输入新的序列号，请在 About 窗口中点击 Re-Register... 按钮。

### 将 Araxis 集成到 Git 作为 Diff 和合并工具 {#integrating-araxis-to-git-as-your-diff-and-merge-tool}

安装 Araxis Merge 后，

在 Mac OS X 上，

- 像往常一样将 Araxis 拖到 ~/Applications 文件夹
- 将 Utilities 文件夹的内容复制到（例如）/usr/local/araxis/bin
- 将路径添加到启动脚本：export PATH="$PATH:/usr/local/araxis/bin"

在 .gitconfig 文件中（已在 Mac OS X 上测试），

```
[diff]
        tool = araxis
[difftool]
        prompt = false
[merge]
        tool = araxis_merge
[mergetool "araxis_merge"]
        cmd = araxisgitmerge "$PWD/$REMOTE" "$PWD/$BASE" "$PWD/$LOCAL" "$PWD/$MERGED"
```

## Git 最佳实践 {#git-best-practices}

这只是个人偏好，但按每个 Jira/功能创建一个 Git 分支可能更容易。例如：

```bash
git checkout trunk
git checkout -b AMBARI12345                             # create the branch and switch to it
git branch --set-upstream-to=origin/trunk AMBARI12345   # set the upstream so that git pull --rebase will get the HEAD from trunk
# Do work,
git commit -m "AMBARI-12345. Foo (username)"
# Do more work
git commit --amend                                      # edit the last commit
git pull --rebase
  
# If conflicts are detected, then run
git mergetool                                           # should be easy if you have Araxis Merge setup to do a 3-way merge
git rebase --continue
git push origin HEAD:trunk
```

## 常用 Git 命令 {#useful-git-commands}

在 .gitconfig 文件中，

```bash
[alias]
        st = status
        ci = commit
        br = branch
        co = checkout
        dc = diff --cached
        dtc = difftool --cached
        lg = log -p
        lsd = log --graph --decorate --pretty=oneline --abbrev-commit --all
        slast = show --stat --oneline HEAD
        pshow = show --no-prefix --format=format:%H --full-index
        pconfig = config --list
```

同样，在 ~/.bashrc 或 ~/.profile 文件中，

```bash
alias branchshow='for k in `git branch|perl -pe s/^..//`;do echo -e `git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k|head -n 1`\\t$k;done|sort'
```

此命令会按分支最后更新时间显示所有分支的排序结果。
