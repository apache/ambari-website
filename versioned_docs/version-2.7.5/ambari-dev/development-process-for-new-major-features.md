# Development Process for New Major Features


## Goals

* Make it clear to the community of new feature development happening at a high level
* Make it easier to correlate features with JIRAs
* Make it easier to track progress for features in development
* Make it easier to understand estimated release schedule for features in development

## Process

* Create a JIRA of type "Epic" for the new feature in [Apache Ambari JIRA](https://issues.apache.org/jira/browse/AMBARI)
* Add the feature to the [Features + Roadmap](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=30755705) wiki and link it to the Epic created
* The Epic should contain a high-level description that is easy to understand
* The Epic should also contain the initial, detailed design (this can be in the form of a shared Google Doc for ease of collaboration,Word doc, pdf, etc)
* Once the initial design is posted, announce to the dev mailing list to elicit feedback (Subject: [DISCUSS] _Epic Name_. Be sure include a link to the Epic JIRA in the body).It is recommended to ask for review feedback to be given by a certain date so that the review process does not drag on.

* Iterate on the design based on community feedback. Incorporate multiple review cycles as needed.

* Once the design is finalized, break it down into Tasks that are linked to the Epic
* (Nice to have) Once the Tasks are defined, schedule them into sprints using the Agile Board so that it's easy to see who is working on what/when, what tasks remain but unassigned so the community can pick up work from the backlog, etc.

## Feature Branches

The use of feature branches allows for the large, potentially destabilizing changes to be made without affecting the stability of the trunk. 

## Feature Flags

* Sometimes, we want to have the ability for the users to experiment with a new feature, but not make expose it as a general feature since it has not gone through rigorous testing. In other cases, we want to provide an escape hatch for certain edge-case scenarios that we may not want to expose in general because using the escape hatch is potentially dangerous and should only be reserved special occasions. For these purposes, Ambari has a notion of **feature flags**. Make use of Feature Flags when adding new features that follow under these categories. [Feature Flags](./feature-flags.md) has more details on this.

## Contribution Flow

[https://docs.google.com/document/d/1hz7qjGKkNeckMibEs67ZmAa2kxjie0zkG6H_IiC2RgA/edit?pli=1](https://docs.google.com/document/d/1hz7qjGKkNeckMibEs67ZmAa2kxjie0zkG6H_IiC2RgA/edit?pli=1)

## Git Feature Branches


The Git feature branch workflow is a simple, yet powerful way to develop new features in an encapsulated environment while at the same time fostering collaboration within the community. The idea is create short-lived branches where new development will take place and eventually merge the completed feature branch back into `trunk`. A short-lived branch could mean anywhere from several days to several months depending on the extent of the feature and how often the branch is merged back into `trunk`.

Feature branches are also useful for changes which are not necessarily considered to be new features. They can be for proof-of-concept changes or architectural changes which have the likelihood of destabilizing `trunk`.

### Benefits

* Allows incremental work to proceed without destabilizing the main trunk of source control.

* Smaller commits means smaller and clearer code reviews.

* Each code review is not required to be fully functional allowing a more agile approach to gathering feedback on the progress of the feature.

* Maintains Git history and allows for code to be backed out easily after merging.

### Drawbacks

* Requires frequent merges from `trunk` into your feature branch to keep merge conflicts to a minimum.

* May require periodic merges of the feature branch back into trunk during development to help mitigate frequent merge conflicts.

* No continuous integration coverage on feature branches. Although this is not really a drawback since most feature branches will break some aspects of CI in the early stages of the feature.

### Guidelines to Follow

The following simple rules can help in keeping Ambari's approach to feature branch development simple and consistent.

* When creating a feature branch, it should be given a meaningful name. Acceptable names include either the name of the feature or the name of the Ambari JIRA. The branch should also always start with the text `branch-feature-`. Some examples of properly named feature branches include:
  - `branch-feature-patch-upgrades`
  - `branch-feature-AMBARI-12345`

* Every commit in your feature branch should have an associated `AMBARI-XXXXX` JIRA. This way, when your branch is merged back into trunk, the commit history follows Ambari's conventions.

* Merge frequently from trunk into your branch to keep your branch up-to-date and lessen the number of potential merge conflicts.

* Do **NOT** squash commits. Every commit in your feature branch must have an `AMBARI-XXXXX` association with it.


* Once a feature has been completed and the branch has been merged into trunk, the branch can be safely removed. Feature branches should only exist while the work is still in progress.

### Approach

The following steps outline the lifecycle of a feature branch. You'll notice that once the feature has been completed and merged back into trunk, the feature branch is deleted. This is an important step to keep the git branch listing as clean as possible.

```
$ git checkout -b branch-feature-AMBARI-12345 trunk
Switched to a new branch 'branch-feature-AMBARI-12345'

$ git push -u origin branch-feature-AMBARI-12345
Total 0 (delta 0), reused 0 (delta 0)
To https://git-wip-us.apache.org/repos/asf/ambari.git
 * [new branch]      branch-feature-AMBARI-12345 -> branch-feature-AMBARI-12345
Branch branch-feature-AMBARI-12345 set up to track remote branch branch-feature-AMBARI-12345 from origin by rebasing.

```

* Branch is correctly named
* Branch is pushed to Apache so it can be visible to other developers

```bash
$ git checkout -b branch-feature-AMBARI-12345 trunk
Switched to a new branch 'branch-feature-AMBARI-12345'

$ git add
$ git commit -m 'AMBARI-28375 - Some Change (me)'

$ git add
$ git commit -m 'AMBARI-28499 - Another Change (me)'

$ git push
```

* Each commit to the feature branch has its own AMBARI-XXXXX JIRA
* Multiple commits are allowed before pushing the changes to the feature branch

```bash
$ git checkout branch-feature-AMBARI-12345
Switched to branch 'branch-feature-AMBARI-18456'

$ git merge trunk
Updating ed28ff4..3ab2a7c
Fast-forward
 ambari-server/include.xml | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 ambari-server/include.xml
```

* Merging trunk into the feature branch often (daily, hourly) allows for faster and easier merge conflict resolution
* Fast-forwards are OK here since trunk is always the source of truth and we don't need extra "merge" commits in the feature branch

```bash
$ git checkout trunk
Switched to branch 'trunk'

$ git merge --no-ff branch-feature-AMBARI-12345
Updating ed28ff4..3ab2a7c
 ambari-server/include.xml | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 ambari-server/include.xml
```

Notice that the `--no-ff` option was provided when merging back into `trunk`. This is to ensure that an additional "merge" commit is created which references all feature branch commits. With this single merge commit, the entire merge can be easily backed out if a problem was discovered which destabilized trunk.

* The feature is merged successfully with a "merge" commit back to trunk
* This can be done multiple times during the course of the feature development as long as the code merged back to trunk is stable

```bash
$ git checkout trunk
Switched to branch 'trunk'

$ git branch -d branch-feature-AMBARI-12345
Deleted branch branch-feature-AMBARI-12345 (was ed28ff4).

$ git push origin --delete branch-feature-AMBARI-12345
To https://git-wip-us.apache.org/repos/asf/ambari.git
 - [deleted]         branch-feature-AMBARI-12345

$ git remote update origin --prune
Fetching origin
From https://git-wip-us.apache.org/repos/asf/ambari
 x [deleted]         (none)     -> branch-feature-AMBARI-56789
```

* Cleanup the branch when done, both locally and remotely
* Prune your local branches which no longer track remote branches

