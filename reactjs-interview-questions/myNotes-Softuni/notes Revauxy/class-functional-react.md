

- PureComponent and React.memo()

class ComponentName extends React.PureComponent 
is like 
React.memo(ComponentName)
in that it stops unnecessary re-renders if props and state do not change