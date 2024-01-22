Set up on windows is not supported, but you can just install WSL to have Ubuntu on your machine, too. This is a way to combine win and linux so don't worry about overhead or performance.

- use powershell for windows commands
- use bash for linux commands

(Git Bash is a specialized tool to control git. It is Linux like git, but it does not provide a Linux evn. So, while Git Bash is particularly useful for Git commands, it also provides a robust command-line environment for performing a wide range of tasks on Windows.)

1. start redis server (local virtual machine) with 'redis-server' in wsl Ubunutu
2. start cli to interact with local redis server database 'redis-cli'
3. create an instance of the local virtual machine in your node.js server