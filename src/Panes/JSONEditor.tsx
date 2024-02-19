import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import React from 'react';

interface IJSONEditorProps {
    data: string,
    saveData: (val: string) => void
}
const JSONEditor: React.FC<IJSONEditorProps> = (props) => {
    let jsonData = props.data;

    const handleSave = () => {
        try {
            const data = JSON.parse(jsonData);
            props.saveData(data);
        }
        catch (e) {
            const message = (e as Error).message;
            console.error(e);
            alert("Invalid JSON: " + message);
        }
    }
    return (
        <div className="w-1/2 border flex flex-col">
            <div className="flex-grow">
                <AceEditor
                    mode="json"
                    theme="monokai"
                    value={props.data}
                    onChange={(val) => {
                        console.log(val)
                        jsonData = val
                    }}
                    name="JSON_EDITOR"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={14}
                    style={{ height: '100%', width: '100%' }}
                />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default JSONEditor   