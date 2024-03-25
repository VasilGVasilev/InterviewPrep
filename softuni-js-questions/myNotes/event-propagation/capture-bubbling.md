Summary:
Event propagation describes the stack of events that are fired in the web browser. Meaning, when we click a button, the intial phase (capture phase) captures the specific element button top to bottom (from window, down to document, to html, to btn). The actual 'capturing' is called target phase. 
Each handler can access event object properties:
- event.target – the deepest element that originated the event.
- event.currentTarget (=this) – the current element that handles the event (the one that has the handler on it). 
The subsequent bubbling up the chain of nodes is called bubbling phase. We use this bubbling phase (which is the defualt for eventListeners) to achieve event delegation, namely, using the parent of common elements to attach an eventListener, making the DOM manipulation process more efficient.

[see](https://javascript.info/bubbling-and-capturing)


Since events are a fundamental part of any web application, we need a way to manage those events and interconnect them to form a whole web page. The structure of any web page is represented by the DOM tree, so this is also the chain that serves as a link between nodes/elements which can fire events. Looking at the DOM tree and knowing that Javascript initial purpose was to be scripting language for static web sites, we can infer why is Javascript's inheritance based on the protoype model. It two interconnects via a chain of objects that each have a prototype which in turn is also an obejct. A DOM tree is similar with its elements that consists of properties and methods, but also of links to parent and children elements. But to go back to the subject matter of the current article, the two event propagation models through which we manage and control the flow of events in the Document Object Model (DOM) are event bubbling and event capture. 

**So, what happens when we click on a button on a web page?**

**Capture**

Well, we would have to first open the root element -> window object, then document, then html then down the tree to the event that actually triggered the event. This is also called the capture phase, we capture the event triggering element.

**Bubbling**

The reverse flow is named bubbling. From the event.target to the outermost layer of the DOM tree. 

**But why do we need them both? Is it not enough to 'capture' the element that triggered the event and save resources on bubbling?**

The reason for needing both capture and bubbling is that we rarely have one element with an event handler. What if we click on a button that is within a div and both of them have an event hanlder? The capture phase will go though the order top-down and trigger the event handler of both the target element - the button and its parent element - the div. We do not want that. We want isolation of event handling. Thus, we need the capture phase to reach the target element, but also a bubbling phase from that very target element up to the top, to have control over the event propagation.

**e.stopPropagation()**

To do this, we apply the e.stopPropagation() method at the top of our event handling function (event obviously passed in as a prop), so that we stop the propagation from going up the parent elements of the target element.

```sh
const Example = () => {
    handleCallFarm() {
        console.log("Hello, whole farm");
    }

    handleChicken() {
        console.log("Hello, chicken!");
    }

    handleCows() {
        console.log("Hello, cows!");
    }

    handlePigs(event) {
        event.stopPropagation(); // USED HERE!
        console.log("Hello, pigs!");
    }

    render() {
        return (
            <div className="parent-element" onClick={handleCallFamily}> 
                <button className="child-element" onClick={handleChicken}>Call Chicken</button>
                <button className="child-element" onClick={handleCows}>Call Cows</button>
                <button className="child-element" onClick={handlePigs}>Call Pigs</button>
            </div>
        );
    }

}
```

so if we click: 
- Call Chicken, we will print:
    "Hello, chicken!"
    "Hello, whole farm"
- Call Cows, we will print:
    "Hello, cows!"
    "Hello, whole farm"

BUT if we click: 
- Call Pigs, we will print only:
    "Hello, pigs!"


That is because we stopped the propagation from going up the parent element. Thus, the most popular use case of the bubbling phase -> event delegation.

**Event Delegation**
Bubbling is essential for event delegation, which is a powerful technique to optimize event handling. By attaching a single event listener to a common ancestor of multiple elements, you can efficiently handle events for all those elements without adding individual event listeners to each one. As we have come to understand now, that would not be possible with capture alone, because we will always have both the parent and the child event handler firing. However, with bubbling, we start from the child and have the capability of stopping further propagation, which enables us to reduce the amount of event handlers by having only one on the parent element. Thus, we both have less event hanlders, but also we do not loose our control to precisely target the child element.

Simply said, we have a child element that triggers an event without the need for handler. Its parent, tho, has a handler, and since bubbling goes up the DOM tree, we intercept the event coming from the child at the parent level.


*An important additional take from this article is the difference between event.target and event.currentTarget. They help illustrate the significance of element that cause the event and element that has an event listener attached to it.*

**Event.target vs Event.currentTarget**

- event.target is the most deeply nested element that caused the event.
- event.currentTarget is the element that listens to the event (where the event listener is attached to).


```sh
const Example = () => {
    handleCallFarm() {
        console.log("Hello, whole farm");
    }

    handleChicken(event) {
        console.log("Hello, chicken!");

        console.log("event.target:", event.target);
        console.log("event.currentTarget", event.currentTarget);
    }

    handleCows() {
        console.log("Hello, cows!");
    }

    handlePigs() {
        event.stopPropagation(); // USED HERE!
        console.log("Hello, pigs!");
    }

    render() {
        return (
            <div className="parent-element" onClick={handleCallFamily}> 
                <button className="child-element" onClick={handleChicken}>Call Chicken</button>
                <button className="child-element" onClick={handleCows}>Call Cows</button>
                <button className="child-element" onClick={handlePigs}>Call Pigs</button>
            </div>
        );
    }

}
```

so if we click: 
- Call Chicken, we will print:
    "Hello, chicken!"
    "event.target:", <button class="child-element">Call Chicken</button>
    "event.currentTarget", <button class="child-element">Call Chicken</button>

BUT if we click: 
- Call Cicken, yet this time target and current target are attached to the parent element:
    "Hello, whole farm!"
    "event.target:", <button class="child-element">Call Chicken</button>
    "event.currentTarget", <div class="parent-element"></div>


```sh
const Example = () => {
    handleCallFarm() {
        console.log("Hello, whole farm");
        
        console.log("event.target:", event.target);
        console.log("event.currentTarget", event.currentTarget);
    }

    handleChicken(event) {
        console.log("Hello, chicken!");

    }

    handleCows() {
        console.log("Hello, cows!");
    }

    handlePigs() {
        event.stopPropagation(); // USED HERE!
        console.log("Hello, pigs!");
    }

    render() {
        return (
            <div className="parent-element" onClick={handleCallFamily}> 
                <button className="child-element" onClick={handleChicken}>Call Chicken</button>
                <button className="child-element" onClick={handleCows}>Call Cows</button>
                <button className="child-element" onClick={handlePigs}>Call Pigs</button>
            </div>
        );
    }

}
```