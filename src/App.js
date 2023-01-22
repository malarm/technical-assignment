import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChildRule from './ChildRule';
import { getItems, createItem } from './store/actions/items';
import uuid from 'react-uuid';
import Accordion from 'react-bootstrap/Accordion';

const App = () => {
  const dispatch = useDispatch();
  const [field, SetField] = useState('');
  const [activeIndex, SetActiveIndex] = useState("");
  const [reload, SetReload] = useState(false);
  const items = useSelector(state => state.items);
  useEffect(() => {
    dispatch(getItems());
  }, [])

  const handleFieldAdd = () => {
    let item = {
      "field_key": `field_${(items.length + 1)}`,
      "field_name": field,
      "options": [],
      "rules": []
    };
    dispatch(createItem(item));
    SetField('');
    SetReload(!reload);
  }

  const addOption = (field_key) => {
    var item = items.filter(x => x.field_key == field_key)[0];
    item.options.push({
      "option_label": "",
      "option_value": ""
    })
    SetReload(!reload);
  }

  const addRule = (field_key) => {
    var item = items.filter(x => x.field_key == field_key)[0];
    item.rules.push({
      "rule_field_key": "",
      "rule_value": "",
      "children": []
    })
    SetReload(!reload);
  }
  const addGroup = (rule) => {
    console.log('rule in agg group : ', rule)
    rule.children.push({
      "rule_field_key": "",
      "rule_value": "",
      "children": []
    })
    SetReload(!reload);
  }

  const deleteOption = (field_key, index) => {
    var item = items.filter(x => x.field_key == field_key)[0];
    item.options.splice(index, 1);
    SetReload(!reload);
  }

  const updateOption = (event, field_key, index, name) => {
    //e.target.value,x.field_key,index,'label'

    var item = items.filter(x => x.field_key == field_key)[0];
    item.options[index][name] = event.target.value;
    SetReload(!reload);
    console.log('update option - ', item)
  }

  return (
    <>
      <header>
        <nav className='navbar fixed-top navbar-light bg-light'>
          <div className='container'>
            <h3>Accutics</h3>
          </div>
        </nav>
      </header>
      <div className='container-fluid app-content px-5 pt-3'>
        <div className='row'>
          <div className='col-12'>
            <h5>Accutics coding challenge:</h5>
          </div>
          <div className='col-9'>
            <div className="accordion" id="accordionExample">
              {
                items.map((x, fieldIndex) =>
                  <Accordion key={uuid()} activeKey={activeIndex} onSelect={(e) => SetActiveIndex(e)}>
                    <Accordion.Item eventKey={fieldIndex}>
                      <Accordion.Header> {x.field_name}</Accordion.Header>
                      <Accordion.Body>
                        <div className="accordion-body">
                          <div>
                            <div className='d-inline-block'>
                              <strong>Options</strong>
                              <table className='mt-3'>
                                <tbody>
                                  {x.options.map((opt, index) =>
                                    <tr key={uuid()} >
                                      <td>{index + 1}</td>
                                      <td><input onChange={(e) => updateOption(e, x.field_key, index, 'option_label')} className='form-control' name='option_label' aria-describedby='fieldName' value={opt.option_label} /></td>
                                      <td><input onChange={(e) => updateOption(e, x.field_key, index, 'option_value')} className='form-control' name='option_value' aria-describedby='fieldName' value={opt.option_value} /></td>
                                      <td><button onClick={() => deleteOption(x.field_key, index)} type="button" className="btn btn-danger">X</button></td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                              <div className='text-end pt-2'>
                                <button type="button" onClick={() => addOption(x.field_key)} className="btn btn-primary">Add Option</button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div style={{ overflowX: 'auto' }}>
                              <strong>Rules</strong>
                              <div className='pt-3'>
                                <table className='w-100'>
                                  <tbody>
                                    {x.rules.map((rul, ruleindex) =>
                                      <tr key={uuid()} className='pb-3'>
                                        <td className='align-top px-2'>{ruleindex + 1}</td>
                                        <td className='p-1'>
                                          <ChildRule rule={rul} reloadEvent={() => SetReload(!reload)} ruleOptions={x.options}></ChildRule>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className='text-end'>
                                <button type="button" onClick={() => addRule(x.field_key)} className="btn btn-primary">Add Rule</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                )
              }
            </div>
          </div>
          <div className='col-3'>
            <form>
              <div className='mb-3'>
                <label htmlFor='fieldName' className='form-label'>Field name</label>
                <input className='form-control' id='fieldName' value={field} onChange={e => SetField(e.target.value)} aria-describedby='fieldName' />
              </div>
              <div className='text-end'>
                <button type="button" onClick={handleFieldAdd} className="btn btn-primary">Add Field</button>
              </div>
            </form>
          </div>
        </div>
        <footer></footer>
      </div>
    </>
  );
};

export default App;
