**PLACEHOLDERNavigation**

After the main Stack.Navigator, the most important one is the one defined in PLACEHOLDERNavigation of which the following code is quintessetial:

```js
    <PLACEHOLDERTabsNavigation.Navigator
        backBehavior="order"
        tabBar={Tabbar}
    >
        {PLACEHOLDERTabs}
    </PLACEHOLDERTabsNavigation.Navigator>
```

the PLACEHOLDERTabs are the tabs which look like this:

```js
    {
        name: PLACEHOLDER.FORM,
        component: PLACEHOLDERForm,
        options: { icon: 'clipboard-account' }
    }
```
theu are determining the little tabs (within the navbar) and the screens they lead to.

**NB** But most important is to note that the Navigator when having a **tabBar** tag, is not only a route mechanism but also shows options (navigation manu) to choose between screens. It does that by encapsulating as you can see those screens (PLACEHOLDERTabs is an array of screens).**The first component of the array being the screen to be rendered when one defualts to the component that returns the DamageNoteTabsNavifation.Navigator.**