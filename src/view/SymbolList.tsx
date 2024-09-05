import { Accordion, Button, Pagination } from 'react-bootstrap';
import { formatSignature, ShaderSymbol, ShaderSymbolType } from './Shader';
import Symbol, { supportSignatureField } from './Symbol';

import { FaTrash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

type SymbolListProps = {
    title: string;
    symbolList : ShaderSymbol[];
    type: ShaderSymbolType;
    handleSymbolChange: ((type: ShaderSymbolType, index: number, symbol: ShaderSymbol) => void)
    handleSymbolAdd: ((type: ShaderSymbolType, symbol: ShaderSymbol) => void)
    handleSymbolRemove: ((type: ShaderSymbolType, index: number) => void)
}

function SymbolList(props: SymbolListProps) {
  const [page, setPage] = useState<number>(0);
  const addElement = () => {
    if (supportSignatureField(props.type)) {
      props.handleSymbolAdd(props.type, {
          id: "id" + Math.random().toString(16).slice(2),
          label: 'Element' + props.symbolList.length,
          description: '',
          version: '',
          stages: [],
          signature: {
            returnType: "void",
            description: "",
            parameters: []
          }
      });
    } else {
      props.handleSymbolAdd(props.type, {
          id: "id" + Math.random().toString(16).slice(2),
          label: 'Element' + props.symbolList.length,
          description: '',
          version: '',
          stages: []
      });
    }
    setPage(Math.ceil((props.symbolList.length + 1) / itemPerPage) - 1);
  };
  const handleSymbolRemove = (index: number) => {
    props.handleSymbolRemove(props.type, index);
  };
  const handleSymbolChange = (index: number, symbol: ShaderSymbol) => {
    props.handleSymbolChange(props.type, index, symbol);
  };
  const itemPerPage = 10;
  const maxPageDisplayed = 9;
  const pageCount = Math.ceil(props.symbolList.length / itemPerPage);
  const handlePageChange = (requestedPage : number) => {
    setPage(Math.min(Math.max(requestedPage, 0), pageCount - 1));
  }
  let items = [];
  const addPage = (number: number) => {
    return (<Pagination.Item key={number+1} active={number === page} onClick={e => handlePageChange(number)}>
        {number}
    </Pagination.Item>)
  }
  if (pageCount <= maxPageDisplayed) {
    for (let number = 0; number < pageCount; number++) {
        items.push(addPage(number));
      }
  } else {
    let sidePageCount = Math.floor(maxPageDisplayed / 2);
    let pageOffset = Math.max(0, Math.min(page - sidePageCount, pageCount - 1 - maxPageDisplayed));
    if (pageOffset > 0) {
      items.push(addPage(0));
    }
    if (pageOffset > 1) {
        items.push(<Pagination.Ellipsis disabled/>);
    }
    for (let number = pageOffset; number < pageOffset + maxPageDisplayed; number++) {
        items.push(addPage(number));
    }
      
    if (page + sidePageCount < pageCount - 1) {
        items.push(<Pagination.Ellipsis disabled/>);
    }
    items.push(addPage(pageCount - 1));
  }
  let offset = itemPerPage * page;
  return (
    <div>
        <Accordion defaultActiveKey="0">
            {props.symbolList.slice(offset, offset + itemPerPage).length === 0 ? <p>No symbol available</p> : props.symbolList?.slice(offset, offset + itemPerPage).map((value, index) => {
                // Use id instead of index to avoid replacing already written values with new ones.
                return (
                    <Accordion.Item key={value.id} eventKey={offset + index + ''}>
                        <Accordion.Header>
                          {value.signature !== undefined && value.signature !== null ? formatSignature(value.label, value.signature) : value.label}
                          &nbsp;&nbsp;
                          <FaTrash onClick={e =>{ handleSymbolRemove(offset + index); e.stopPropagation();}}/>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Symbol index={offset + index} type={props.type} symbol={value} handleSymbolChange={handleSymbolChange}/>
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>

        <Button variant="primary" onClick={addElement}>Add a {props.title}</Button>
        <br/><br/>
        <Pagination>
        <Pagination.Prev onClick={e => handlePageChange(page-1)} />
        {items}
        <Pagination.Next onClick={e => handlePageChange(page+1)} />
        </Pagination>
    </div>
  );
}

export default SymbolList;
