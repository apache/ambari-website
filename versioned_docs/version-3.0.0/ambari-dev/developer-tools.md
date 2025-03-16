# Developer Tools

## Diff and Merge tools

Araxis has been kind enough to give us free licenses for Araxis Merge if you work on open source, just submit a request at http://www.araxis.com/buy/open-source

Download from http://www.araxis.com/url/merge/download.uri

You will be prompted for your serial number when you run the application for the first time. To enter a new serial number into an existing installation, click the Re-Register... button in the About window.

### Integrating Araxis to Git as your Diff and Merge tool

After installing Araxis Merge,

On Mac OS X,

- Drag Araxis across to your ~/Applications folder as normal
- Copy the contents of the Utilities folder to (e.g.) /usr/local/araxis/bin
- Add the path to your startup script: export PATH="$PATH:/usr/local/araxis/bin"

In your .gitconfig file (tested on Mac OS X),

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

## Git Best Practices

This is just a personal preference, but it may be easier to create one Git branch per Jira/feature. E.g.,

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

##  Useful Git Commands

In your .gitconfig file,

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

Also, in your ~/.bashrc or ~/.profile file,

```bash
alias branchshow='for k in `git branch|perl -pe s/^..//`;do echo -e `git show --pretty=format:"%Cgreen%ci %Cblue%cr%Creset" $k|head -n 1`\\t$k;done|sort'
```

This command will show all of your branches sorted by the last commit times, which is useful if you develop one feature per branch.