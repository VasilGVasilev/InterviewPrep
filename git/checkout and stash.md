git stash does not include untracked (new files) or .gitignore files. thus:
git stash -a 
but the stash is global, meaning

git stash -a
git checkout branch-b

making changes on branch-b and stashing them is impossible since the stash of branch a and b is common.

**best practice, stash to see something on another branch, but never leave uncommited changes**