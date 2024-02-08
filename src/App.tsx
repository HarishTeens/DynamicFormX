import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

function App() {
  const jsonData = { "name": "John", "age": 30, "city": "New York" };
  return (
    <div className="flex flex-col h-screen">
      <h1 className='text-center text-3xl'>DynamicFormX</h1>
      <div className="flex-grow border mt-5">
        <div className="flex flex-row h-full">
          <div className="w-1/2 border flex flex-col">
            <div className="flex-grow">
              <AceEditor
                mode="json"
                theme="monokai"
                value={JSON.stringify(jsonData, null, 4)}
                onChange={newValue => console.log(newValue)}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                fontSize={14}
                style={{ height: '100%', width: '100%' }}
              />
            </div>
            <button>Save</button>
          </div>
          <div className="w-1/2 border">
            <h2 className="text-center text-2xl">Preview</h2>
          </div>
        </div>
      </div>
    </div>


  );
}

export default App;