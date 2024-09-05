import { Form, InputGroup } from 'react-bootstrap';
import { ShaderSymbol, ShaderSymbolType } from './Shader';

import 'bootstrap/dist/css/bootstrap.min.css';

type SymbolProps = {
    symbol : ShaderSymbol;
    type: ShaderSymbolType;
    index: number;
    handleSymbolChange: ((index: number, symbol: ShaderSymbol) => void)
}

function supportTypeField(type: ShaderSymbolType) {
    switch(type) {
        case ShaderSymbolType.Constants:
        case ShaderSymbolType.Variables:
            return true;
        case ShaderSymbolType.Functions:
        case ShaderSymbolType.Keywords:
        case ShaderSymbolType.Types:
            return false;
    }
}

function Symbol(props: SymbolProps) {
  const handleLabelChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        label: e.target.value,
    });
  };
  const handleDescriptionChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        description: e.target.value,
    });
  };
  const handleVersionChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        version: e.target.value,
    });
  };
  return (
    <div>
        <InputGroup>
            <InputGroup.Text>Label</InputGroup.Text>
            <Form.Control aria-label="Label" defaultValue={props.symbol.label} onChange={handleLabelChange}/>
        </InputGroup>
        <InputGroup>
            <InputGroup.Text>Description</InputGroup.Text>
            <Form.Control as="textarea" aria-label="Description" defaultValue={props.symbol.description} onChange={handleDescriptionChange}/>
        </InputGroup>
        <InputGroup>
            <InputGroup.Text>Version</InputGroup.Text>
            <Form.Control aria-label="Version" defaultValue={props.symbol.version} onChange={handleVersionChange}/>
        </InputGroup>
        <InputGroup>
            <InputGroup.Text>Link</InputGroup.Text>
            <Form.Control aria-label="Link" defaultValue={props.symbol.link}/>
        </InputGroup>
        {
            !supportTypeField(props.type) ? undefined : <InputGroup>
                <InputGroup.Text>Type</InputGroup.Text>
                <Form.Control aria-label="Type" defaultValue={props.symbol.ty}/>
            </InputGroup>
        }
        {
            props.type === ShaderSymbolType.Functions ? <div>
                <h3>Signature</h3>
                <h4>Return</h4>
                <InputGroup>
                    <InputGroup.Text>Return</InputGroup.Text>
                    <Form.Control aria-label="Return" defaultValue={props.symbol.signature?.returnType}/>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Description</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="Description" defaultValue={props.symbol.signature?.description}/>
                </InputGroup>
                <h4>Parameters</h4>
                {
                    props.symbol.signature?.parameters.map(parameter => {
                        return (<div>
                            <InputGroup>
                                <InputGroup.Text>Type</InputGroup.Text>
                                <Form.Control aria-label="Type" defaultValue={parameter.ty}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>Label</InputGroup.Text>
                                <Form.Control aria-label="Label" defaultValue={parameter.label}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>Description</InputGroup.Text>
                                <Form.Control as="textarea" aria-label="Description" defaultValue={parameter.description}/>
                            </InputGroup>
                        </div>);
                    })
                }
            </div> : undefined
        }
                            
    </div>
  );
}

export default Symbol;
