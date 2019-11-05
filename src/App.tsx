import "./normalize.css"
import "./reset.css"
import "./typography.css"
import React from "react"
import {Editor} from "./uikit/simple-editor"
import styled from "@emotion/styled"

const EditorWrapper = styled.div`
  border: 1px solid black;
`;

const App: React.FC = () => {
    return (
      <div>
          <h1>Remirror Editor</h1>
          <EditorWrapper>
              <Editor
                suppressHydrationWarning={true}
                autoFocus={false}
              />
          </EditorWrapper>
      </div>
    )
}

export default App

