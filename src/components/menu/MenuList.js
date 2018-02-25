import React from 'react';
import {List,Avatar,Button,Modal} from 'antd';
import EditFood from './EditFood';

const MenuList = ({menuList, loading,getMenuDetail,visible,food,closeDialog,saveFood,file,changeFile,uploadFile,deleteFood}) => {
  return (
    <div>
      <div style={{paddingTop:'30px',height:400,overflowY:'auto'}}>
        <List
          bordered
          split={true}
          loading={loading}
          itemLayout="horizontal"
          dataSource={menuList}
          size="middle"
          renderItem={item => (
            <List.Item onClick={()=>getMenuDetail(item.id)}>
              <List.Item.Meta
                avatar={<Avatar src={item.pic} size="large"/>}
                title={<p>{item.name}&nbsp;&nbsp;类型：{item.type}</p>}
                description={
                  <div>
                    <div>{item.desc}</div>
                    <div><span style={{color:'red'}}>&yen;{item.price}</span></div>
                  </div>}
              />
              <div style={{display: item.num===0?'none':'inline'}}>{item.num}份</div>
              <div style={{display: item.num===0?'inline':'none'}}>售馨</div>
            </List.Item>
          )}
        />
      </div>
      <div style={{textAlign:'center', width:'100%'}}>
        <Button type='primary' style={{width:'100%'}} onClick={()=>getMenuDetail()}>添加</Button>
      </div>

      <Modal
        style={{margin:0,top:0}}
        width="100%"
        title="编辑食物"
        visible={visible}
        mask={true}
        maskStyle={{backgroundColor:'rgba(232,230,225,0.5)'}}
        footer={null}
        onOk={() => closeDialog(true)}
        onCancel={() => closeDialog(true)}>
        <EditFood food={food} saveFood={saveFood} file={file} changeFile={changeFile} uploadFile={uploadFile} deleteFood={deleteFood}/>
      </Modal>

    </div>
  );
};

MenuList.propTypes = {
};

export default MenuList;
