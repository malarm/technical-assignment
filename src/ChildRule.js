import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';

export default function ChildRule({ rule, reloadEvent, ruleOptions }) {
    const items = useSelector(state => state.items);

    const updateRule = (value) => {
        rule.rule_field_key = value;
        reloadEvent();
    }
    const updateRuleValue = (value) => {
        rule.rule_value = value;
        reloadEvent();
    }
    
    const addGroup = (rule) => {
        console.log('rule in agg group : ', rule)
        rule.children.push({
            "rule_field_key": "",
            "rule_value": "",
            "children": []
        })
        reloadEvent();
    }
    return (
        <div className='border border-2 border-secondary p-2 m-2'>
            <table className='w-100'>
                <tbody>
                    <tr>
                        <td>
                            <select className='form-select' value={rule.rule_field_key} onChange={(e) => updateRule(e.target.value)}>{items.map(s => <option key={uuid()} value={s.field_key}>{s.field_name}</option>)}</select>
                        </td>
 
                        <td>
                            <select className='form-select' value={rule.rule_value} onChange={(e) => updateRuleValue(e.target.value)}>{ruleOptions.map(s => <option key={uuid()} value={s.option_value}>{s.option_label}</option>)}</select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>{rule.children.map((y, index) => <ChildRule key={uuid()} rule={y} ruleOptions={ruleOptions} reloadEvent={reloadEvent} />)}</td>
                    </tr>
                </tbody>
            </table>
            <div className='text-end'>
                <button type="button" onClick={() => addGroup(rule)} className="btn btn-primary">Add Group</button>
            </div>
        </div>
    )
}
