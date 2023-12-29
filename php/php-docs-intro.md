Looking through the intro, I stumbled upon installation for php being thread safe or non-thread safe.

Installation:

Thread-safe: It is used to ensure that when the shared data structure which is manipulated by different threads are prevented from entering the **race condition**. 
Non-thread-safe: It does not check the safety of the threads which makes it **faster** to run but at the same time, it becomes more **unstable** and crashes very frequently

VScode setup:

instead of using c:\php\php.exe for every command on you VScode powershell apply the following config to File > Preference > Settings

Running php files:

PHP is a server side language, so you always need a server

1. Start a web server:

php -S localhost:4000

