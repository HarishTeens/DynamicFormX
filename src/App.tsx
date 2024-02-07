import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

function App() {
  const jsonData = { "name": "John", "age": 30, "city": "New York" };
  return (
    <AceEditor
      mode="json"
      theme="monokai"
      value={JSON.stringify(jsonData, null, 4)}
      onChange={newValue => console.log(newValue)}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default App;