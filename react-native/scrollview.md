When working with input fields you need better control over keyboard showing up or not. The most straightforward way is to control the onFocus onBlur of a keyboard is to have only TextInputs since they have priority in terms of keyboard focus/blur. But this is a workaround that is costly since disabling editing (editing="false") make the component non-selectable in Android.

### onPress needs two clicks

But onPress on Pressable button needs two clicks - first to close the keyboard and only the second one triggers the onPress event.

this is managable since the **Pressable has a direct pranent ScrollView**
### keyboardShouldPersistTaps

The keyboardShouldPersistTaps prop in React Native controls the behavior of the keyboard when a touch is made inside a ScrollView or FlatList. The difference between 'handled' and 'always' is that 'handled' allows the keyboard to be dismissed when a touch is made on a **non-interactive area**, while 'always' keeps the keyboard open until it is manually dismissed, regardless of where the touch is made. For **interactive areas** use the Keyboard.dismiss() within the Pressbale onPress.