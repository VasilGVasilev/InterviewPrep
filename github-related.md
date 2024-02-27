I can get the green checks for each day only if I commit from my git local accounf vaskomeil@gmail.com, I can commit from my work account to the github profile, too. But only through the synchronised accound Github and git local, I will get the checks.

You can change the git email for a specific repo only: 

1. Using git config --local:

Most Git commands accept a --local flag to specify that the configuration should be applied only to the current repository. For example, to set your name and email address for a specific repository, you can use:

```sh
git config --local user.name "Your Name"
git config --local user.email "your_email@example.com"
```