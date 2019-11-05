import {
    ManagedRemirrorProvider,
    RemirrorManager,
    useRemirrorContext,
} from "@remirror/react";

import React, { FC } from "react";
import { WysiwygEditorProps, WysiwygExtensions } from "../wysiwyg-types";

export const WysiwygEditor: FC<WysiwygEditorProps> = (
    {
        defaultLanguage,
        children,
        ...props
    },
) => {

    return (
        <RemirrorManager>
            <ManagedRemirrorProvider {...props}>
                <>
                    <InnerEditor/>
                    {children}
                </>
            </ManagedRemirrorProvider>
        </RemirrorManager>
    )
};

/**
 * The internal editor responsible for the editor layout and ui.
 * Any component rendered has access to the remirror context.
 */
const InnerEditor: FC = () => {
    const { getRootProps } = useRemirrorContext<WysiwygExtensions>();

    return (
        <div {...getRootProps()} data-testid='remirror-wysiwyg-editor'/>
    )
};
