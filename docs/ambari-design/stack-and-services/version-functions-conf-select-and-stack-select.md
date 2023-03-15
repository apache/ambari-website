# Version functions: conf-select and stack-select

Especially during upgrade, it is important to be able to set the current stack and configuration versions. For non-custom services, these functions are implemented in the conf-select and stack-select functions. These can be imported in a service's scripts with the following imports:

```py
from resource_management.libraries.functions import conf_select

from resource_management.libraries.functions import stack_select
```

Typically the select functions, which is used to set the stack and configuration versions, are called in the pre_upgrade_restart function during a rolling upgrade:

```py
  def pre_upgrade_restart(self, env, upgrade_type=None):
    import params
    env.set_params(params)

    # this function should not execute if the version can't be determined or
    # the stack does not support rolling upgrade
    if not (params.version and check_stack_feature(StackFeature.ROLLING_UPGRADE, params.version)):
      return

    Logger.info("Executing <My Service> Stack Upgrade pre-restart")
    conf_select.select(params.stack_name, "<my_service>", params.version)
    stack_select.select("<my_service>", params.version)
```

The select functions will set up symlinks for the current stack or configuration version. For the stack, this will set up the links from the stack root current directory to the particular stack version. For example:

```
/usr/hdp/current/hadoop-client -> /usr/hdp/2.5.0.0/hadoop
```

For the configuration version, this will set up the links for all the configuration directories, as follows:

```
/etc/hadoop/conf -> /usr/hdp/current/hadoop-client/conf

/usr/hdp/current/hadoop-client/conf -> /etc/hadoop/2.5.0.0/0
```

The stack_select and conf_select functions can also be used to return the hadoop directories:

```
hadoop_prefix = stack_select.get_hadoop_dir("home")

hadoop_bin_dir = stack_select.get_hadoop_dir("bin")

hadoop_conf_dir = conf_select.get_hadoop_conf_dir()
```

The conf_select api is as follows:

```py
def select(stack_name, package, version, try_create=True, ignore_errors=False)

def get_hadoop_conf_dir(force_latest_on_upgrade=False)
```

The stack_select api is as follows:
```py
def select(component, version)

def get_hadoop_dir(target, force_latest_on_upgrade=False)
```

Unfortunately for custom services these functions are not available to set up their configuration or stack versions. A custom service could implement their own functions to set up the proper links.
