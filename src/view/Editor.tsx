import { useState } from 'react';
import '../style/Editor.css';
import { ShaderSymbol, ShaderSymbolList, ShaderSymbolType } from './Shader';
import SymbolList from './SymbolList';
import { Form, Tab, Tabs, ToastContainer } from 'react-bootstrap';

function getTabs(symbolList : ShaderSymbolList) : [string, ShaderSymbol[], ShaderSymbolType][] {
  return [
      ["Constants", symbolList.constants, ShaderSymbolType.Constants],
      ["Types", symbolList.types, ShaderSymbolType.Types],
      ["Functions", symbolList.functions, ShaderSymbolType.Functions],
      ["Variables", symbolList.variables, ShaderSymbolType.Variables],
      ["Keywords", symbolList.keywords, ShaderSymbolType.Keywords],
  ];
}

function Editor() {
  const [symbolList, setSymbolList] = useState<ShaderSymbolList>({
    constants: [],
    types: [],
    functions: [],
    variables: [],
    keywords: [],
  });
  const [tabs, setTabs] = useState<[string, ShaderSymbol[], ShaderSymbolType][]>(getTabs(symbolList));
  
  async function handleFileChange(event : any) {
    let json = event.target.files[0];
    if (json !== undefined) {
        let txt = await json.text();
        let jsonSymbolList : ShaderSymbolList = JSON.parse(txt);
        console.log(jsonSymbolList);
        setSymbolList(jsonSymbolList)
        setTabs(getTabs(jsonSymbolList));
    }
  }
  function handleSymbolAdd(type: ShaderSymbolType, newSymbol: ShaderSymbol) {
    let updatedSymbolList : ShaderSymbolList;
    switch (type)
    {
    case ShaderSymbolType.Constants:
        updatedSymbolList = {
            ...symbolList,
            constants: [ 
                ...symbolList.constants,
                newSymbol,
            ]
        };
        break;
    case ShaderSymbolType.Functions:
        updatedSymbolList = {
            ...symbolList,
            functions: [ 
                ...symbolList.functions,
                newSymbol,
            ],
        };
        break;
    case ShaderSymbolType.Variables:
        updatedSymbolList = {
            ...symbolList,
            variables: [ 
                ...symbolList.variables,
                newSymbol,
            ],
        };
        break;
    case ShaderSymbolType.Keywords:
        updatedSymbolList = {
            ...symbolList,
            keywords: [ 
                ...symbolList.keywords,
                newSymbol,
            ],
        };
        break;
    case ShaderSymbolType.Types:
        updatedSymbolList = {
            ...symbolList,
            types: [ 
                ...symbolList.types,
                newSymbol,
            ],
        };
        break;
    default:
        throw new Error("Unhandled symbol type");
    }
    setSymbolList(updatedSymbolList);
    setTabs(getTabs(updatedSymbolList));
  }
  function handleSymbolChange(type: ShaderSymbolType, index: number, updatedSymbol : ShaderSymbol) {
    console.log("Updated list :");
    let updatedSymbolList : ShaderSymbolList;
    switch (type)
    {
    case ShaderSymbolType.Constants:
        updatedSymbolList = {
            ...symbolList,
            constants: symbolList.constants.map((e, i) => {
                if (i === index)
                    return updatedSymbol;
                else 
                    return e;
            }),
        };
        break;
    case ShaderSymbolType.Functions:
        updatedSymbolList = {
            ...symbolList,
            functions: symbolList.functions.map((e, i) => {
                if (i === index)
                    return updatedSymbol;
                else 
                    return e;
            }),
        };
        break;
    case ShaderSymbolType.Variables:
        updatedSymbolList = {
            ...symbolList,
            variables: symbolList.variables.map((e, i) => {
                if (i === index)
                    return updatedSymbol;
                else 
                    return e;
            }),
        };
        break;
    case ShaderSymbolType.Keywords:
        updatedSymbolList = {
            ...symbolList,
            keywords: symbolList.keywords.map((e, i) => {
                if (i === index)
                    return updatedSymbol;
                else 
                    return e;
            }),
        };
        break;
    case ShaderSymbolType.Types:
        updatedSymbolList = {
            ...symbolList,
            types: symbolList.types.map((e, i) => {
                if (i === index)
                    return updatedSymbol;
                else 
                    return e;
            }),
        };
        break;
    default:
        throw new Error("Unhandled symbol type");
    }
    setSymbolList(updatedSymbolList);
    setTabs(getTabs(updatedSymbolList));
  }
  return (
    <div className="Editor">
        <main>
            <h1>Shader intrinsics editor</h1>
            <div>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" accept=".json" onChange={handleFileChange} />
                </Form.Group>
            </div>
            <Tabs defaultActiveKey={tabs?.[0][0]} fill>
                {tabs?.map((value : [string, ShaderSymbol[], ShaderSymbolType]) => {
                    return (
                        <Tab key={value[0]} eventKey={value[0]} title={value[0] + " (" + (value[1]?.length || 0) + ")"}>
                            <SymbolList title={value[0]} symbolList={value[1]} type={value[2]} handleSymbolChange={handleSymbolChange} handleSymbolAdd={handleSymbolAdd}/>
                        </Tab>
                    )
                })}
            </Tabs>
        </main>
    </div>
  );
}

export default Editor;
