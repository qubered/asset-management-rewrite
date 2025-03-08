import type { ReactNode } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertBoxProps {
  show: boolean
  icon?: ReactNode
  title?: string
  description?: string
  variant?: "default" | "success" | "error"
}

export function AlertBox({
  show,
  icon,
  title = "Heads up!",
  description = "You can add components to your app using the cli.",
  variant = "default",
}: AlertBoxProps) {
  if (!show) return null

  const getDefaultIcon = () => {
    if (variant === "success") return <CheckCircle className="h-4 w-4 text-green-500" />
    if (variant === "error") return <AlertCircle className="h-4 w-4 text-red-500" />
    return null
  }

  const getAlertClass = () => {
    if (variant === "success") return "border-green-500 text-green-500"
    if (variant === "error") return "border-red-500 text-red-500"
    return ""
  }

  return (
    <Alert className={getAlertClass()}>
      {icon || getDefaultIcon()}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-wrap">{description}</AlertDescription>
    </Alert>
  )
}

