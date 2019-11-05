import {
    ParagraphExtension,
    PlaceholderExtension,
    TrailingNodeExtension,
} from "@remirror/core-extensions"

import { DropCursorExtension } from "@remirror/extension-drop-cursor"
import {
    ManagedRemirrorProvider,
    RemirrorExtension,
    RemirrorManager,
    useRemirrorContext,
} from "@remirror/react"

import React, { FC } from "react"
import { WysiwygEditorProps, WysiwygExtensions } from "../wysiwyg-types"

const defaultPlaceholder = "Start typing..."

export const WysiwygEditor: FC<WysiwygEditorProps> = (
    {
        placeholder = defaultPlaceholder,
        theme = Object.create(null),
        supportedLanguages: supportedLanguagesProp = [],
        syntaxTheme = "atomDark",
        defaultLanguage,
        children,
        ...props
    },
) => {

    return (
        <RemirrorManager>
            <RemirrorExtension
                Constructor={PlaceholderExtension}
                placeholderStyle={{
                    color: "#aaa",
                    fontStyle: "normal",
                    position: "absolute",
                    fontWeight: 300,
                    letterSpacing: "0.5px",
                }}
                placeholder={placeholder}
            />
            <RemirrorExtension Constructor={ParagraphExtension}/>
            <RemirrorExtension Constructor={DropCursorExtension} priority={1}/>
            <RemirrorExtension Constructor={TrailingNodeExtension}/>
            <ManagedRemirrorProvider {...props}>
                <>
                    <InnerEditor/>
                    {children}
                </>
            </ManagedRemirrorProvider>
        </RemirrorManager>
    )
}

/**
 * The internal editor responsible for the editor layout and ui.
 * Any component rendered has access to the remirror context.
 */
const InnerEditor: FC = () => {
    const { getRootProps } = useRemirrorContext<WysiwygExtensions>()

    return (
        <div {...getRootProps()} data-testid='remirror-wysiwyg-editor'/>
    )
}
