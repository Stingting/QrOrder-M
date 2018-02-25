import React from 'react';
import {List,Badge,Icon,Popconfirm,Button,Modal} from 'antd';
import EditTable from './EditTable';

const TableList = ({tableList,loading,editTable,deleteTable,visible,table,closeDialog,saveTable}) => {
  return (
    <div>
      <div style={{paddingTop: '60px', backgroundColor: 'rgb(249, 247, 247)',height:500, overflowY: 'auto'}}>
        <List
          bordered
          split={true}
          loading={loading}
          itemLayout="horizontal"
          dataSource={tableList}
          size="middle"
          renderItem={item => (
            <List.Item style={{borderBottom: 0, marginBottom: 16, backgroundColor: 'white'}}
                       actions={[<a onClick={() => editTable(item.id)}><Icon type="edit" title="修改"/></a>,
                         <Popconfirm placement="top" title="确定要删除吗" onConfirm={() => deleteTable(item.id)} okText="确定"
                                     cancelText="取消">
                           <a><Icon type="delete" title="删除"/></a>
                         </Popconfirm>]}>
              <List.Item.Meta
                title={<Badge count={5} offset={[-18, -2]}><p>{item.name}&nbsp;&nbsp;用餐人数：{item.personNum}</p></Badge>}
                description={
                  <div>
                    <div>消费金额：&yen;{item.price}</div>
                  </div>
                }
              />
              <div>
                {/*1:闲置2:点餐中,3:正在使用,4:待清理,5:清理中*/}
                {(() => {
                  switch (item.status) {
                    case 1:
                      return "空桌";
                    case 2:
                      return "点餐中";
                    case 3:
                      return "正在使用";
                    case 4:
                      return "待清理";
                    case 5:
                      return "清理中";
                    default:
                      return "";
                  }
                })()}
              </div>
            </List.Item>
          )}
        />
      </div>
      <div style={{textAlign: 'center', width: '100%', position: 'fixed'}}>
        <Button type='primary' style={{width: '100%'}} onClick={() => editTable()}>添加</Button>
      </div>
      <Modal
        style={{margin: 0, top: 0,height:"100%"}}
        width="100%"
        title="编辑餐桌"
        visible={visible}
        mask={true}
        maskStyle={{backgroundColor: 'rgba(232,230,225,0.5)'}}
        footer={null}
        onOk={() => closeDialog(true)}
        onCancel={() => closeDialog(true)}>
        <EditTable saveTable={saveTable} table={table}/>
      </Modal>
    </div>
  );
};

TableList.propTypes = {
};

export default TableList;
