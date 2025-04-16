# How to Commit

This document describes how to commit changes to Ambari. It assumes a knowledge of Git. While it is for committers to use as a guide, it also provides contributors an idea of how the commit process actually works.

In general we are very conservative about changing the Apache Ambari code base. It is ground truth for systems that use it, so we need to make sure that it is reliable. For this reason we use Review Then Commit (RTC) http://www.apache.org/foundation/glossary.html#ReviewThenCommit change policy.

Except for some very rare cases any change to the Apache Ambari code base will start off as a Jira. (In some cases a change may relate to more than one Jira. Also, there are cases when a Jira results in multiple commits.) Generally, the process of getting ready to commit when the Jira has a patch associated with it and the contributor decides that it is ready for review and marks it patch available.

A committer must sign off on a patch. It is very helpful if the community also reviews the patch, but in the end a committer must take responsibility for the correctness of the patch. If the patch is simple enough and the committer feels confident in the review, a single +1 from a committer is sufficient to commit the patch. (Remember committers cannot review their own patch. If a committer submits a patch, they should make sure that another committer reviews it.)

Follow the instructions in [How to Contribute](./how-to-contribute.md) guide to commit changes to Ambari.

If the Jira is a bug fix you may also need to commit the patch to the latest branch in git (trunk).

