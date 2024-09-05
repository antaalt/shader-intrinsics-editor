import { useState } from 'react';
import '../style/Editor.css';
import { ShaderSymbol, ShaderSymbolList, ShaderSymbolType } from './Shader';
import SymbolList from './SymbolList';
import { Button, Form, Tab, Tabs, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';

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
    } else {
        throw Error("Failed to parse intrinsic file");
    }
  }
  function handleFileSave(event: any) {
    function replacer(key : string,value: any)
    {
        if (key === "id") return undefined;
        else if (key === "ty" && typeof value === 'string' && value.length === 0) return undefined;
        else return value;
    }
    let str = JSON.stringify(symbolList, replacer);
    let blob = new Blob([str], {type : 'application/json'});
    const a = document.createElement('a');
    a.download = 'intrinsics.json';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
        setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
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
    toast.info("Adding an element", {
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: true,
    });
    setSymbolList(updatedSymbolList);
    setTabs(getTabs(updatedSymbolList));
  }
  function handleSymbolRemove(type: ShaderSymbolType, index: number) {
    switch (type)
    {
    case ShaderSymbolType.Constants:
        symbolList.constants.splice(index, 1);
        break;
    case ShaderSymbolType.Functions:
        symbolList.functions.splice(index, 1);
        break;
    case ShaderSymbolType.Variables:
        symbolList.variables.splice(index, 1);
        break;
    case ShaderSymbolType.Keywords:
        symbolList.keywords.splice(index, 1);
        break;
    case ShaderSymbolType.Types:
        symbolList.types.splice(index, 1);
        break;
    default:
        throw new Error("Unhandled symbol type");
    }
    setSymbolList(symbolList);
    setTabs(getTabs(symbolList));
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
        <div>
            <header>
                <h1>Shader intrinsics editor</h1>
            </header>
            <main>
                <div>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" accept=".json" onChange={handleFileChange} />
                    </Form.Group>
                </div>
                <Tabs defaultActiveKey={tabs?.[0][0]} fill>
                    {tabs?.map((value : [string, ShaderSymbol[], ShaderSymbolType]) => {
                        return (
                            <Tab key={value[0]} eventKey={value[0]} title={value[0] + " (" + (value[1]?.length || 0) + ")"}>
                                <SymbolList title={value[0]} symbolList={value[1]} type={value[2]} handleSymbolChange={handleSymbolChange} handleSymbolAdd={handleSymbolAdd} handleSymbolRemove={handleSymbolRemove}/>
                            </Tab>
                        )
                    })}
                </Tabs>
            </main>
            <footer>
                <ToastContainer />
                <Button onClick={handleFileSave}>Save</Button>
            </footer>
        </div>
    </div>
  );
}

export default Editor;
