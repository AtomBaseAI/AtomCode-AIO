"use client"

import * as React from "react"
import { Check, ChevronsUpDown, LoaderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface SubTopicOption {
    id: string
    name: string
    isDefault: boolean
}

export interface TopicOption {
    id: string
    name: string
    isDefault: boolean
    subtopics: SubTopicOption[]
}

/**
 * Fetch a group's topics (+ subtopics) for the question form dropdowns.
 * Falls back to an empty list — callers always append/keep "general".
 * Loading is derived (the requested groupId hasn't finished loading yet),
 * so no setState runs synchronously inside the effect.
 */
export function useGroupTopics(groupId?: string | null) {
    const [topics, setTopics] = React.useState<TopicOption[]>([])
    const [loadedFor, setLoadedFor] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (!groupId) return
        let cancelled = false
        fetch(`/api/question-groups/${groupId}/topics`)
            .then((res) => (res.ok ? res.json() : { topics: [] }))
            .then((data) => {
                if (!cancelled) {
                    setTopics(data.topics ?? [])
                    setLoadedFor(groupId)
                }
            })
            .catch(() => {
                if (!cancelled) setLoadedFor(groupId)
            })
        return () => {
            cancelled = true
        }
    }, [groupId])

    const loading = groupId != null && loadedFor !== groupId
    return { topics, loading }
}

interface TopicComboboxProps {
    /** Option names, in display order. */
    options: string[]
    value: string
    onChange: (name: string) => void
    disabled?: boolean
    placeholder?: string
    searchPlaceholder?: string
    emptyText?: string
    /** Show a spinner while the options load. */
    loading?: boolean
}

/**
 * Searchable single-select combobox (Popover + cmdk) used for the
 * topic / sub topic fields on the question forms.
 */
export function TopicCombobox({
    options,
    value,
    onChange,
    disabled,
    placeholder = "Select…",
    searchPlaceholder = "Search…",
    emptyText = "Nothing found.",
    loading,
}: TopicComboboxProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled || loading}
                    className="w-full justify-between font-normal"
                >
                    <span
                        className={cn(
                            "truncate",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value || placeholder}
                    </span>
                    {loading ? (
                        <LoaderIcon className="size-4 shrink-0 animate-spin opacity-50" />
                    ) : (
                        <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option}
                                    value={option}
                                    onSelect={() => {
                                        onChange(option)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 size-4",
                                            option === value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
