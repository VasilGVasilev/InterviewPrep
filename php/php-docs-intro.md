Looking through the intro, I stumbled upon installation for php being thread safe or non-thread safe.

Installation:

Thread-safe: It is used to ensure that when the shared data structure which is manipulated by different threads are prevented from entering the **race condition**. 
Non-thread-safe: It does not check the safety of the threads which makes it **faster** to run but at the same time, it becomes more **unstable** and crashes very frequently

VScode setup:

instead of using c:\php\php.exe for every command on you VScode powershell apply the following config to File > Preference > Settings: php.validate.executablePath: points to the PHP executable on disk. Set this if the PHP executable is not on the system path. BUT this is not necessary since I did put the path to the php executable in the env vars of windows

**To install just download and past php folder in program files and set the path to the php [executable](https://www.geeksforgeeks.org/how-to-install-php-in-windows-10/)**
**I prefered the xampp option**

Running php files:

PHP is a server side language, so you always need a server

1. Start a web server:

php -S localhost:4000

