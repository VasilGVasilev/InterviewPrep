Looking through the intro, I stumbled upon installation for php being thread safe or non-thread safe.

Thread-safe: It is used to ensure that when the shared data structure which is manipulated by different threads are prevented from entering the **race condition**. 
Non-thread-safe: It does not check the safety of the threads which makes it **faster** to run but at the same time, it becomes more **unstable** and crashes very frequently