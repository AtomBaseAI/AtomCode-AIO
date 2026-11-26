"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { LoaderIcon, KeyRound, ShieldAlert } from "lucide-react"
import { toast } from "sonner"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { updateAuthCode } from "@/actions/admin-manage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Static 4-digit super-admin auth code manager.
 * The code is the second login factor for every super admin; it is stored
 * in the Setting KV store and enforced by authorize() on every sign-in.
 */
export function AuthCodeForm({ currentCode }: { currentCode: string }) {
  const [code, setCode] = useState("")
  const [isLoading, startTransition] = useTransition()
  const [shown, setShown] = useState(false)

  const handleSave = () => {
    if (!/^\d{4}$/.test(code)) {
      toast.error("Auth code must be exactly 4 digits")
      return
    }
    startTransition(() => {
      updateAuthCode({ code })
        .then((data) => {
          if (data.success) {
            toast.success(data.success)
            setCode("")
          } else if (data.error) {
            toast.error(data.error)
          }
        })
        .catch(() => toast.error("Something went wrong!"))
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-purple-600" aria-hidden />
          Super Admin Auth Code
        </CardTitle>
        <CardDescription>
          Static 4-digit second factor required after super admin credentials
          at sign-in. Changing it applies to every future super admin login
          immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <ShieldAlert className="h-4 w-4" aria-hidden />
          <AlertTitle>Current code</AlertTitle>
          <AlertDescription className="flex items-center gap-3">
            <span className="font-mono text-lg font-semibold tracking-[0.4em]">
              {shown ? currentCode : "••••"}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShown((s) => !s)}
            >
              {shown ? "Hide" : "Show"}
            </Button>
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <span className="text-sm font-medium">New code</span>
            <InputOTP
              maxLength={4}
              value={code}
              onChange={(v) => setCode(v)}
              disabled={isLoading}
              aria-label="New 4-digit auth code"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            onClick={handleSave}
            disabled={isLoading || code.length !== 4}
          >
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            Save code
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          The code is stored server-side and verified on every super admin
          sign-in attempt — direct API calls cannot bypass it.
        </p>
      </CardContent>
    </Card>
  )
}
