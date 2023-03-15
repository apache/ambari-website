
# Stack Inheritance

Each stack version must provide a metainfo.xml descriptor file which can declare whether the stack inherits from another stack version:

```xml
<metainfo>
    <versions>
      <active>true</active>
    </versions>
    <extends>2.3</extends>
         ...
</metainfo>
```

When a stack inherits from another stack version, how its defining files and directories are inherited follows a number of different patterns.

The following files should not be redefined at the child stack version level:

* properties/stack_features.json
* properties/stack_tools.json

Note: These files should only exist at the base stack level.

The following files if defined in the current stack version replace the definitions from the parent stack version:

* kerberos.json
* widgets.json

The following files if defined in the current stack version are merged with the parent stack version:

* configuration/cluster-env.xml

* role_command_order.json

Note: All the services' role command orders will be merge with the stack's role command order to provide a master list.

All attributes of the current stack version's metainfo.xml will replace those defined in the parent stack version.

The following directories if defined in the current stack version replace those from the parent stack version:

* hooks

This means the files included in those directories at the parent level will not be inherited. You will need to copy all the files you wish to keep from that directory structure.

The following directories are not inherited:

* repos
* upgrades

The repos/repoinfo.xml file should be defined in every stack version. The upgrades directory and its corresponding XML files should be defined in all stack versions that support upgrade.

## Services Folder

The services folder is a special case. There are two inheritance mechanisms at work here. First the stack_advisor.py will automatically import the parent stack version's stack_advisor.py script but the rest of the inheritance behavior is up to the script's author. There are several examples of [stack_advisor.py](https://github.com/apache/ambari/blob/trunk/ambari-server/src/main/resources/stacks/HDP/2.3/services/stack_advisor.py) files in the Ambari server source.

```python
    class HDP23StackAdvisor(HDP22StackAdvisor):
      def __init__(self):
        super(HDP23StackAdvisor, self).__init__()
        Logger.initialize_logger()
 
      def getComponentLayoutValidations(self, services, hosts):
        parentItems = super(HDP23StackAdvisor, self).getComponentLayoutValidations(services, hosts)
                 ...
```

Services defined within the services folder follow the rules for [service inheritance](./custom-services.md#Service20%Inheritance). By default if a service does not declare an explicit inheritance (via the **extends** tag), the service will inherit from the service defined at the parent stack version.
