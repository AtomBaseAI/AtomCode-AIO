"use client"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoaderIcon, ArrowLeft, ShieldCheck } from "lucide-react"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas/auth-schema"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { login } from "@/actions/login"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export function LoginForm() {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [isLoading, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    // Super admin second step — after valid credentials the action returns
    // { twoFactor: true } and we show the 4-digit auth code panel instead
    // of the email/password fields.
    const [twoFactor, setTwoFactor] = useState(false)
    const [authCode, setAuthCode] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                        return;
                    }
                    if (data?.twoFactor) {
                        // Keep the credentials client-side only for the
                        // immediately-following verify call; never stored.
                        setEmail(values.email);
                        setPassword(values.password);
                        setAuthCode("");
                        setTwoFactor(true);
                        setSuccess("Credentials verified. Enter the 4-digit auth code.");
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    }

    const handleVerify = () => {
        setError("");
        setSuccess("");
        if (!/^\d{4}$/.test(authCode)) {
            setError("Enter the 4-digit auth code");
            return;
        }
        startTransition(() => {
            login({ email, password, code: authCode })
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                        return;
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    }

    if (twoFactor) {
        return (
            <div className="grid gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                        <ShieldCheck className="h-5 w-5" aria-hidden />
                    </span>
                    <p className="text-sm font-medium">Super Admin verification</p>
                    <p className="text-xs text-muted-foreground">
                        Enter the static 4-digit auth code to continue
                    </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <InputOTP
                        maxLength={4}
                        value={authCode}
                        onChange={(v) => {
                            setAuthCode(v);
                            setError("");
                        }}
                        disabled={isLoading}
                        aria-label="4-digit auth code"
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        className="w-full"
                        onClick={handleVerify}
                        disabled={isLoading || authCode.length !== 4}
                    >
                        {isLoading && (
                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Verify &amp; Sign In
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        disabled={isLoading}
                        onClick={() => {
                            setTwoFactor(false);
                            setAuthCode("");
                            setError("");
                            setSuccess("");
                        }}
                    >
                        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                        Back to login
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="user@atom.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
