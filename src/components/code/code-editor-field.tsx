"use client"

/**
 * Form-friendly CodeMirror editor with syntax highlighting.
 *
 * Designed to replace plain <Textarea> inputs for code fields (e.g. the
 * "Server Code" field in the admin Create/Edit Question forms).
 *
 * - Syntax highlighting + keyword autocomplete follow the `lang` prop
 *   (share the same loader as the IDE runners via code-mirror-language.ts).
 * - Theme-aware: vscodeDark in dark mode, eclipse in light mode.
 * - controlled via `value` / `onChange` so it drops straight into
 *   react-hook-form <FormField> render props.
 */

import { useEffect, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { eclipse } from "@uiw/codemirror-theme-eclipse"
import { EditorView } from "@codemirror/view"
import { autocompletion } from "@codemirror/autocomplete"
import type { Extension } from "@codemirror/state"
import { useTheme } from "next-themes"
import {
    getCustomCompletionSource,
    isCodeMirrorLanguage,
    loadLanguageExtension,
} from "@/components/code/code-mirror-language"
import { cn } from "@/lib/utils"

interface CodeEditorFieldProps {
    value?: string
    onChange?: (value: string) => void
    /** Language id (c, cpp, java, python, sql, javascript, typescript, ruby). Empty/unknown => plain text. */
    lang?: string
    disabled?: boolean
    placeholder?: string
    /** Wrapper sizing classes, e.g. "h-full min-h-[420px]". */
    className?: string
}

const CodeEditorField = ({
    value = "",
    onChange,
    lang,
    disabled = false,
    placeholder,
    className,
}: CodeEditorFieldProps) => {
    const { resolvedTheme } = useTheme()
    const [extension, setExtension] = useState<Extension | null>(null)
    const langSupported = !!lang && isCodeMirrorLanguage(lang)

    useEffect(() => {
        let cancelled = false
        const load = async () => {
            if (!lang || !isCodeMirrorLanguage(lang)) return null;
            return loadLanguageExtension(lang);
        };
        load().then((loaded) => {
            if (cancelled) return;
            setExtension((loaded as Extension) ?? null);
        });
        return () => {
            cancelled = true
        }
    }, [lang])

    return (
        <div
            className={cn(
                "w-full overflow-hidden rounded-md border bg-white dark:bg-[#1e1e1e] text-left",
                "[&_.cm-editor]:h-full [&_.cm-editor]:text-left",
                "[&_.cm-scroller]:overflow-auto [&_.cm-gutters]:rounded-l-md",
                disabled && "pointer-events-none opacity-60",
                className
            )}
        >
            <CodeMirror
                value={value ?? ""}
                height="100%"
                minHeight="420px"
                theme={resolvedTheme === "dark" ? vscodeDark : eclipse}
                extensions={[
                    ...(extension ? [extension] : []),
                    langSupported
                        ? autocompletion({
                              override: [getCustomCompletionSource(lang!)],
                          })
                        : [],
                    EditorView.lineWrapping,
                    EditorView.editable.of(!disabled),
                ]}
                editable={!disabled}
                readOnly={disabled}
                placeholder={placeholder}
                basicSetup={{
                    foldGutter: true,
                    highlightActiveLine: true,
                    highlightActiveLineGutter: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: false,
                    highlightSelectionMatches: true,
                    searchKeymap: true,
                }}
                style={{ fontSize: 13 }}
                onChange={(val) => onChange?.(val)}
            />
        </div>
    )
}

export default CodeEditorField
