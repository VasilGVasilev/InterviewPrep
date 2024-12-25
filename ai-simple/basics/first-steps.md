# History

It seems that the pivotal moment for most LLMs now is the self-attention mechanism in Transformers that replaced the previous recurrence and convoltuions mechanism that interpreted questions word by word. The new self-attention mechanism made possible the referencing of each word to each other word, thus, processing an entire sentence/abstracts' meaning **in parallel, rather than sequentially**.

Ex.

a 10 word sentence creates a 10x10 matrix where each cell represents how much one word relates ot another (in parallel).

This relation is possible by vectorizing words, so that 'dog' and 'puppy' are closer in value than 'dog' and 'chair'.


### CNN vs Transformers

Convolutional Neural Networks are deemed as the initial deep learning standard before the advent of Transformers, but in reality, the two meachnism have different use cases. CNN are better at detail differentiation like image recognition, while Transformers' power is all about gloabl observation.