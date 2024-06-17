import nltk
from nltk.chat.util import Chat, reflections

pairs = [
    [
        r"my name is (.*)",
        ["Hello %1, How are you today ?",],
    ],
    [
        r"hi|hey|hello",
        ["Hello", "Hey there",],
    ],
    [
        r"what is your name ?",
        ["I'm a bot. You can call me GitHub Copilot.",],
    ],
    [
        r"how are you ?",
        ["I'm doing good. How about You ?",],
    ],
    [
        r"sorry (.*)",
        ["Its alright", "Its OK, never mind",],
    ],
    [
        r"I am fine",
        ["Great to hear that, How can I help you?",],
    ],
]

def chatbot():
    print("Hi, I'm the chatbot you built")

chat = Chat(pairs, reflections)
chat.converse()