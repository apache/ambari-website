# Hooks

A stack can add during the following points in Ambari actions:

* before ANY
* before and after INSTALL
* before RESTART
* before START

As mentioned in [Stack Inheritance](./stack-inheritance.md), the hooks directory if defined in the current stack version replace those from the parent stack version. This means the files included in those directories at the parent level will not be inherited. You will need to copy all the files you wish to keep from that directory structure.

The hooks directory should have 5 sub-directories:

* after-INSTALL
* before-ANY
* before-INSTALL
* before-RESTART
* before-START

Each hook directory can have 3 sub-directories:

* files
* scripts
* templates

The scripts directory is the main directory and must be supplied. This must contain a hook.py file. It may contain other python scripts which initialize variables (like a params.py file) or other utility files contain functions used in the hook.py file.

The files directory can any non-python files such as scripts, jar or properties files.

The templates folder can contain any required j2 files that are used to set up properties files.

The hook.py file should extend the Hook class defined in resource_management/libraries/script/hook.py. The naming convention is to name the hook class after the hook folder such as AfterInstallHook if the class is in the after-INSTALL folder. The hook.py file must define the hook(self, env) function. Here is an example hook:

>

```py
from resource_management.libraries.script.hook import Hook
 
class AfterInstallHook(Hook):
 
  def hook(self, env):
    import params
    env.set_params(params)
    # Call any functions to set up the stack after install
 
if __name__ == "__main__":
  AfterInstallHook().execute()
```
