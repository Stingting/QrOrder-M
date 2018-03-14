import React from 'react';
import {List,Badge,Icon,Popconfirm,Button,Modal,Dropdown,Menu} from 'antd';
import {Link} from 'dva/router';
import EditTable from './EditTable';
import {getLocalStorage, getSessionStorage} from "../../utils/helper";

const TableList = ({tableList,loading,editTable,deleteTable,visible,table,closeDialog,saveTable}) => {
  function getActions(status,id) {
    if(status===1) {
      return [<a onClick={(e) => editTable(id,e)}><Icon type="edit" title="修改"/></a>,
             <Popconfirm placement="top" title="确定要删除吗" onConfirm={(e) => deleteTable(id,e)} okText="确定"
                    cancelText="取消" onCancel={(e)=>{ e.stopPropagation();}}>
                  <a onClick={(e)=>{ e.stopPropagation();}}><Icon type="delete" title="删除"/></a>
             </Popconfirm>];
    } else if(status ===2) {
      return [<a onClick={(e) => editTable(id,e)}><Icon type="edit" title="修改"/></a>];
    } else {
      return '';
    }
  }

  //获取餐桌的未读数
  function getUnreadCount(id) {
      const count = getLocalStorage(`table/${id}`);
      return count;
  }

  function dropDownMenu(id) {

    return <Menu>
             <Menu.Item key="0">
                <Link to={{
                  pathname:`/app/v1/order`,
                  state:id
                }}>订单列表</Link>
             </Menu.Item>
             <Menu.Item key="1">
                <Link to={{
                  pathname:`/app/v1/chat`,
                  state:id
                }}>聊天室</Link>
             </Menu.Item>
           </Menu>

  };

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
            <Dropdown overlay={dropDownMenu(item.id)} trigger={['click']}>
            <List.Item style={{borderBottom: 0, marginBottom: 16, backgroundColor: 'white'}}
                       actions={getActions(item.status,item.id)}>
              <List.Item.Meta
                title={<Badge count={getUnreadCount(item.id)} offset={[-18, -2]}><p>{item.name}&nbsp;&nbsp;用餐人数：{item.personNum}</p></Badge>}
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
            </Dropdown>
          )}
        />
      </div>
      <div style={{textAlign: 'center', width: '100%', position: 'fixed'}}>
        <Button type='primary' style={{width: '100%'}} onClick={(e) => editTable(null,e)}>添加</Button>
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
