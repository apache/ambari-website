# FAQ

## **[STACK]/[SERVICE]/metainfo.xml**

**If a component exists in the parent stack and is defined again in the child stack with just a few attributes, are these values just to override the parent's values or the whole component definition is replaced? What about other elements in metainfo.xml -- which rules apply?**

Ambari goes property by property and merge them from parent to child. So if you remove a category for example from the child it will be inherited from parent, that goes for pretty much all properties.

So, the question is how do we tackle existence of a property in both parent and child. Here, most of the decision still follow same paradigm as take the child value instead of parent and every property in parent, not explicitly deleted from child using a marker like 


* For config-dependencies, we take all or nothing approach, if this property exists in child use it and all of its children else take it from parent.

* The custom commands are merged based on names, such that merged definition is a union of commands with child commands with same name overriding those fro parent.

* Cardinality is overwritten by a child or take from the parent if child has not provided one.

You could look at this method for more details: `org.apache.ambari.server.api.util.StackExtensionHelper#mergeServices`

For more information see the [Service Inheritance](./custom-services.md#Service20%Inheritance) wiki page.

**If a component is missing in the new definition but is present in the parent, does it get inherited?**

Generally yes.

**Configuration dependencies for the service -- are they overwritten or merged?**

Overwritten.

