"use client"

import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { javaLanguage } from '@codemirror/lang-java';
import { useTheme } from 'next-themes';

const CodeSnippet = ({ code }: { code: any }) => {
    const { theme } = useTheme()
    // Stable extension array — a fresh array literal per render forced
    // CodeMirror to reconfigure its internal state on every render.
    const extensions = useMemo(() => [javaLanguage], []);
    return (
        <CodeMirror
            className='w-full'
            value={code}
            theme={theme === 'dark' ? vscodeDark : eclipse}
            extensions={extensions}
            style={{ fontSize: 16 }}
            readOnly={true}
        />
    )
}

export default CodeSnippet
