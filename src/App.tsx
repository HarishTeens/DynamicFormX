
import JSONEditor from './Panes/JSONEditor';
import FormView from './Panes/FormView';
import { useState } from 'react';

const jsonData = JSON.stringify({ "name": "John", "age": 30, "city": "New York" }, null, 4);
function App() {
  const [formJson, setFormJson] = useState<string>(jsonData);
  const onSave = (val: string) => setFormJson(val);

  return (
    <div className="flex flex-col h-screen">
      <h1 className='text-center text-3xl'>DynamicFormX</h1>
      <div className="flex-grow border mt-5">
        <div className="flex flex-row h-full">
          <JSONEditor data={formJson} saveData={onSave} />
          <FormView />
        </div>
      </div>
    </div>


  );
}

export default App;