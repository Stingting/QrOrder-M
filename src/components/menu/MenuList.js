import React from 'react';
import {List} from 'antd';
import {Button,WhiteSpace,Modal,ActionSheet} from 'antd-mobile';
import EditFood from './EditFood';
const alert = Modal.alert;

const MenuList = ({menuList, loading,getMenuDetail,visible,food,
                    closeDialog,saveFood,file,uploadLoading,changeFile,uploadFile,deleteFood}) => {

    // fix touch to scroll background page on iOS
   // https://github.com/ant-design/ant-design-mobile/issues/307
  // https://github.com/ant-design/ant-design-mobile/issues/163
  const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
  let wrapProps;
  if (isIPhone) {
    wrapProps = {
      onTouchStart: e => e.preventDefault(),
    };
  }
  function showActionSheet (id) {
    const BUTTONS = ['编辑', '删除', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        // title: 'title',
        message: '',
        maskClosable: true,
        'data-seed': 'logId',
        wrapProps,
      },
      (buttonIndex) => {
        const action =BUTTONS[buttonIndex];
        if(action === '编辑') {
          getMenuDetail(id);
        } else if(action === '删除') {
          alert('删除', '确定删除吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => deleteFood(id)},
          ])
        } else {
          console.log(`action=${action}`);
        }
      });
  };
  return (
    <div>
      <div style={{paddingTop: 45,height:460,overflowY:'auto',backgroundColor:'white'}}>
        <List
          split={true}
          loading={loading}
          itemLayout="horizontal"
          dataSource={menuList}
          size="middle"
          renderItem={item => (
            <List.Item onClick={()=>showActionSheet(item.id)}>
              <List.Item.Meta
                avatar={<img width={100} height={100} src={item.pic} alt={item.name}/>}
                title={<div><p>{item.name}</p><p>{item.type}</p></div>}
                description={
                  <div>
                    <div>{item.desc}</div>
                    <div><span style={{color:'red'}}>&yen;{item.price}</span></div>
                  </div>}
              />
              <div style={{display: item.num===0?'none':'inline'}}>剩余{item.num}份</div>
              <div style={{display: item.num===0?'inline':'none'}}>售馨</div>
            </List.Item>
          )}
        />
      </div>
      <div style={{textAlign:'center', width:'100%'}}>
        <WhiteSpace />
        <Button type="primary" size='small' onClick={()=>getMenuDetail()}>新增</Button>
      </div>

      <Modal
        title="编辑食物"
        visible={visible}
        footer={[]}
        closable={true}
        onClose={() => closeDialog(true)}>
        <EditFood
          food={food}
          saveFood={saveFood}
          changeFile={changeFile}
          uploadFile={uploadFile}
        />
      </Modal>

    </div>
  );
};

MenuList.propTypes = {
};

export default MenuList;
