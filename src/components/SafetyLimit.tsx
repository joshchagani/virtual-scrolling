import { Children, ReactNode } from "react"

function SafetyLimit({ children }: { children: ReactNode }) {
  const numberOfChildren = Children.count(children)
  if (numberOfChildren > 5000) return (<div><p>Too large</p></div>)
  return (
    <div>{children}</div>
  )
}

export default SafetyLimit
