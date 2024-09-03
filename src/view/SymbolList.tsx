import { Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { ShaderSymbol, ShaderSymbolType } from './Shader';
import Symbol from './Symbol';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

type SymbolListProps = {
    title: string;
    symbolList : ShaderSymbol[];
    type: ShaderSymbolType;
    handleSymbolChange: ((type: ShaderSymbolType, index: number, symbol: ShaderSymbol) => void)
    handleSymbolAdd: ((type: ShaderSymbolType, symbol: ShaderSymbol) => void)
}

function SymbolList(props: SymbolListProps) {
  const addElement = () => {
    props.handleSymbolAdd(props.type, {
        id: "id" + Math.random().toString(16).slice(2),
        label: 'Element' + props.symbolList.length,
        description: '',
        version: '',
        stages: []
    });
    toast.info("Adding an element", {
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: true,
    });
  };
  const handleSymbolChange = (index: number, symbol: ShaderSymbol) => {
    props.handleSymbolChange(props.type, index, symbol);
  };
  return (
    <div>
        <Accordion defaultActiveKey="0">
            {props.symbolList.length === 0 ? <p>No symbol available</p> : props.symbolList?.map((value, index) => {
                return (
                    <Accordion.Item key={value.id} eventKey={index + ''}>
                        <Accordion.Header>{value.label}</Accordion.Header>
                        <Accordion.Body>
                            <Symbol index={index} type={props.type} symbol={props.symbolList[index]} handleSymbolChange={handleSymbolChange}/>
                            
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
        {/*<ToastContainer /> Frequenty crashes... */}
        <Button variant="primary" onClick={addElement}>Add a {props.title}</Button>
    </div>
  );
}

export default SymbolList;
