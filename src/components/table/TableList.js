import React from 'react';
import {Badge, Icon, List} from 'antd';
import {Button, Modal, WhiteSpace} from 'antd-mobile';
import EditTable from './EditTable';
import {getLocalStorage} from "../../utils/helper";

const operation = Modal.operation;
const alert = Modal.alert;

const TableList = ({tableList,loading,editTable,deleteTable,visible,table,closeDialog,saveTable,selectedTo}) => {
  function getActions(status,id) {
    if(status===1) {
      return [<a onClick={(e) => editTable(id,e)}><Icon type="edit" title="修改"/></a>,
              <a onClick={(e) =>{
                e.stopPropagation();
                alert('删除', '确定删除吗？', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确定', onPress: () => deleteTable(id,e) },
                ])}}><Icon type="delete" title="删除"/></a>];
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
                       actions={getActions(item.status,item.id)}
                       onClick={() => operation([
                         { text: '订单列表', onPress: () => selectedTo(item.id,'order') },
                         { text: '聊天室', onPress: () => selectedTo(item.id,'chat') },
                       ])}>
              <List.Item.Meta
                title={<Badge count={getUnreadCount(item.id)} offset={[-18, -2]}><p>{item.name}</p></Badge>}
                description={
                  <div>
                    <div>用餐人数：&nbsp;{item.personNum}</div>
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
        <WhiteSpace />
        <Button type="primary"  size='small' onClick={(e) => editTable(null,e)}>新增</Button>
      </div>
      <Modal
        title="编辑餐桌"
        visible={visible}
        footer={[]}
        closable={true}
        onClose={() => closeDialog(true)}>
        <EditTable saveTable={saveTable} table={table}/>
      </Modal>
    </div>
  );
};

TableList.propTypes = {
};

export default TableList;
