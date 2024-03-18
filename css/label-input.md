While makinga radio button that has the input diplay:none, I stumbled upon a problem.

Only clicking on the label triggers an event, but clicking beyond that does not register. The fault was with the parent div, whose padding was set so big that made only a small label area in the center clickable. To evade that I had to set the padding of the parent to be none, while increasing the padding of the label, thus, making the clickable area the whole radio button.

how does clicking on the label constitute a click as if on the input -> for + id:

In most modern web browsers, clicking on the label associated with a radio button will function the same way as clicking directly on the radio button itself. This is because web developers can use the for attribute on the label element to link it to the specific radio button using its id attribute.